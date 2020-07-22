import React from 'react';
import { Button } from 'antd';
import {inject, observer} from 'mobx-react';
import { ReactSortable } from "react-sortablejs";
import { addItem } from '../util/index';

@inject('DSL')
@observer
class Drawer extends React.Component {
  DSL = this.props.DSL;

  render() {
    let list = this.DSL.schema.children;
    return (
      <div>
        <ReactSortable
          list={list}
          setList={(newList, func, dragStore) => {
            // 判断是add还是move ..
            if(JSON.stringify(this.DSL.schema.children).length === JSON.stringify(newList).length ) {
              this.DSL.schema.children = newList
            }
          }}
          group={{ name: "cloning-group-name" }}
          onAdd={(evt, func, dragStore) => addItem(evt, func, dragStore, list)}
          // move function 没有找到新旧index
          // onMove={(moveEvt, evt, func, dragStore) => moveItem(moveEvt, evt, func, dragStore, list)}
          style={{minHeight: '50vh'}}
        >
            {list.map(item => {
              return (
                <Button block style={{ margin: '2px' }} type="dashed" key={item.props.key}>{item.componentText}</Button>
              )
            })}
        </ReactSortable>
      </div>
    )
  }

}

export default Drawer