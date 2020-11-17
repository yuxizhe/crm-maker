import React from 'react';
import { Row, Col } from 'antd';
import Item from './Item';
import { observer, inject } from 'mobx-react';
import { ReactSortable } from "../lib/react-sortablejs/index.ts";
import { addItem } from '../util/index';

@inject('DSL')
@observer
class ItemContainer extends React.Component {
  DSL = this.props.DSL;
  element = this.props.element;

  checkSelect = (element) => {
    if(element.props && this.DSL.selectItem.props && element.props.key === this.DSL.selectItem.props.key) {
      return 'selected'
    }
  }

  setSelect = (e) => {
    // 阻止冒泡
    e.stopPropagation();
    this.DSL.selectItem = this.props.element;
    this.DSL.selectItemParent = this.props.parent;
    this.DSL.selectItemIndex = this.props.index;
  }

  render() {
    let element = this.props.element;
    return (
      <div className={`item-container ${this.checkSelect(element)}`} onClick={this.setSelect}>
        {element.componentName === 'Row' && 
          <Row>
            {element.children.map((item, index) => {
              return (
                <Col span={item.props.span}>
                  <ItemContainer key={item.props.key} element={item} DSL={this.DSL} parent={element.children} index={index}/>
                </Col>
              )
            })}
          </Row>
        }
        {element.componentName.match(/^(Modal|Card|Descriptions|Col)$/) &&
          <div>
            {element.componentName.match(/^(Modal|Card|Descriptions)$/) ? `${element.componentText}: ` : '' }
            <ReactSortable
              list={element.children}
              setList={(newList, func, dragStore) => {
                // TODO: 提PR修改react-sortablejs库的逻辑. onAdd
                element.children = newList
              }}
              group={{ name: "cloning-group-name" }}
              onAdd={(evt, func, dragStore) => addItem(evt, func, dragStore, element.children, this.DSL, element)}
              style={{minHeight: '50px'}}
            >
                {element.children.map((item, index) => {
                  return (
                    // <div className={`item-container ${this.checkSelect(item)}`}>
                    //   <Item key={item.props.key} element={item} />
                    // </div>
                    // build 模式 引用自身出错
                    <ItemContainer key={item.props.key} element={item} DSL={this.DSL} parent={element.children} index={index}/>
                  )
                })}
            </ReactSortable>
          </div>
        }
        {!element.componentName.match(/^(Modal|Card|Descriptions|Col|Row)$/) &&
          <Item key={element.props.key} element={element} />
        }
      </div>
    )
  }
}

export default ItemContainer