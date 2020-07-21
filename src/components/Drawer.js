import React from 'react';
import { Divider, Button } from 'antd';

import { basicComponents, layoutComponents } from './InitJson'

class Drawer extends React.Component {
  render() {
    return (
      <div>
        {layoutComponents.map(item => {
          return (
            <Button style={{margin: '2px'}} type="dashed" key={item.componentText}>{item.componentText}</Button>
          )
        })}
        <Divider />
        {basicComponents.map(item => {
          return (
            <Button style={{margin: '2px'}}type="dashed" key={item.componentText}>{item.componentText}</Button>
          )
        })}
      </div>
    )
  }

}

export default Drawer