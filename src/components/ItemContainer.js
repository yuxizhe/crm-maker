import React from 'react';
// import { Button } from 'antd';
import Item from './Item';
import { observer, inject } from 'mobx-react';
import { ReactSortable } from "../lib/react-sortablejs/index.ts";
import { addItem } from '../util/index';

@inject('DSL')
@observer
class ItemContainer extends React.Component {
  DSL = this.props.DSL;
  element = this.props.element;

  checkSelect = () => {
    if(this.element.props && this.DSL.selectItem.props && this.element.props.key === this.DSL.selectItem.props.key) {
      return 'selected'
    }
  }

  render() {
    let element = this.props.element;
    return (
      <div className={`item-container ${this.checkSelect()}`}>
        {element.componentName.match(/^(Modal|Card|Descriptions)$/) ?
          <div>
            {element.componentText}: 
            <ReactSortable
              list={element.children}
              setList={(newList, func, dragStore) => {
                // TODO: 提PR修改react-sortablejs库的逻辑. onAdd
                element.children = newList
              }}
              group={{ name: "cloning-group-name" }}
              onAdd={(evt, func, dragStore) => addItem(evt, func, dragStore, element.children, this.props.DSL)}
              // move function 没有找到新旧index
              // onMove={(moveEvt, evt, func, dragStore) => moveItem(moveEvt, evt, func, dragStore, list)}
              style={{minHeight: '50px'}}
            >
                {element.children.map(item => {
                  return (
                    // <Item key={item.props.key} element={item} />
                    <ItemContainer key={item.props.key} element={item} DSL={this.props.DSL}/>
                  )
                })}
            </ReactSortable>
          </div>
          : <Item key={element.props.key} element={element} />
        }

      </div>
    )
  }
}

export default ItemContainer