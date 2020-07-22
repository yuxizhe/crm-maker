import React from 'react';
import { Divider, Button } from 'antd';
import {inject} from 'mobx-react';

@inject('DSL')
class Drawer extends React.Component {
  DSL = this.props.DSL;
  render() {
    return (
      <div>
        {this.DSL.schema}
      </div>
    )
  }

}

export default Drawer