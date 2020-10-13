import React from 'react';
import { Divider, Button } from 'antd';
import { ReactSortable } from "../lib/react-sortablejs/index.ts";

import { basicComponents, layoutComponents } from './InitJson'

class Drawer extends React.Component {
  render() {
    return (
      <div className='drawer-box'>
        输入组件
        <ReactSortable
          list={basicComponents}
          setList={() => {}}
          group={{ name: "cloning-group-name", pull: "clone", put: false}}
          sort={false}
        >
          {basicComponents.map(item => {
            return (
              <Button className='item-box' key={item.componentName}>{item.componentText}</Button>
            )
          })}
        </ReactSortable>
        <Divider />
        展示组件
        <ReactSortable
          list={layoutComponents}
          setList={() => {}}
          group={{ name: "cloning-group-name", pull: "clone", put: false }}
          sort={false}
        >
          {layoutComponents.map(item => {
            return (
              <Button className='item-box' key={item.componentName}>{item.componentText}</Button>
            )
          })}
        </ReactSortable>
      </div>

    )
  }

}

export default Drawer