import React from 'react';
import { Button } from 'antd';
import {inject, observer} from 'mobx-react';
import { ReactSortable } from "react-sortablejs";

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
          setList={newChildren => {console.log(newChildren); this.DSL.schema.children = newChildren}}
          group={{ name: "cloning-group-name"}}
          clone={item => ({ ...item,})}
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