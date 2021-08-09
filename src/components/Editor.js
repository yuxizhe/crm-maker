import React from 'react';
// import { Button } from 'antd';
import {inject, observer} from 'mobx-react';
import { ReactSortable } from "../lib/react-sortablejs/index.ts";
import { addItem } from '../util/index';
import ItemContainer from './ItemContainer';

@inject('DSL')
@observer
class Editor extends React.Component {
  DSL = this.props.DSL;
  state = { DSL: this.DSL };

  render() {
    let list = this.DSL.schema.children;
    return (
      <div className="editor-box">
        <ReactSortable
          list={list}
          setList={(newList, func, dragStore) => {
            // TODO: 提PR修改react-sortablejs库的逻辑. onAdd     
            this.DSL.schema.children = newList
          }}
          group={{ name: "cloning-group-name" }}
          onAdd={(evt, func, dragStore) => {addItem(evt, func, dragStore, list, this.DSL)}}
          style={{minHeight: '90vh'}}
        >
          {
            list.map((item, index) => {
              return (
                <ItemContainer key={item.props.key} element={item} parent={list} index={index}/>
              )
            })
          }
        </ReactSortable>
        {list && list.length <= 0 &&
          <div className='empty-text'>从左侧拖拽来添加组件</div>
        }
      </div>
    )
  }

}

export default Editor