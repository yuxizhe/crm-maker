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

  render() {
    let list = this.DSL.schema.children;
    return (
      <div>
        <ReactSortable
          list={list}
          setList={(newList, func, dragStore) => {
            // TODO: 提PR修改react-sortablejs库的逻辑. onAdd     
            this.DSL.schema.children = newList
          }}
          group={{ name: "cloning-group-name" }}
          onAdd={(evt, func, dragStore) => {addItem(evt, func, dragStore, list, this.DSL)}}
          // move function 没有找到新旧index
          // onMove={(moveEvt, evt, func, dragStore) => moveItem(moveEvt, evt, func, dragStore, list)}
          style={{minHeight: '90vh'}}
        >
            {list.map((item, index) => {
              return (
                <ItemContainer key={item.props.key} element={item} parent={list} index={index}/>
              )
            })}
        </ReactSortable>
      </div>
    )
  }

}

export default Editor