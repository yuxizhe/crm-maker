import React from 'react';
import {inject, observer} from 'mobx-react';
import { Input } from 'antd';

@inject('DSL')
@observer
class ConfigItem extends React.Component {
  render() {
    let selectItem = this.props.DSL.selectItem;
    return (
      <div>
        {selectItem && selectItem.props && Object.keys(selectItem.props).indexOf('label') >=0  && 
          <div className="config-item-line">
            <span> 标签名：</span>
            <Input value={selectItem.props.label} onChange={(e) => selectItem.props.label = e.target.value }></Input>
          </div>
        }
        {selectItem && selectItem.props && Object.keys(selectItem.props).indexOf('placeholder') >=0  && 
          <div className="config-item-line">
            <span>占位内容：</span>
            <Input value={selectItem.props.placeholder} onChange={(e) => selectItem.props.placeholder = e.target.value }></Input>
          </div>
        }
      </div>
    )
  }
}

export default ConfigItem;