import React from 'react';
// import { Button } from 'antd';
import Item from './Item';

class ItemContainer extends React.Component {
  render() {
    return (
      <div className={'item-container'}>
        <Item  element={this.props.element}/>
      </div>
    )
  }
}

export default ItemContainer