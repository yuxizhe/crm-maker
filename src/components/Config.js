import React from 'react';
import { inject, observer } from 'mobx-react';
import { Input, Switch, Icon, Button } from 'antd';

@inject('DSL')
@observer
class ConfigItem extends React.Component {
  render() {
    let selectItem = this.props.DSL.selectItem;
    const itemProps = (selectItem && selectItem.props) ? Object.keys(selectItem.props) : ''
    return (
      <div>
        {
          itemProps &&
          <>
            {itemProps.indexOf('name') >= 0 &&
              <div className="config-item-line">
                <span> mobx变量名：</span>
                <Input value={selectItem.props.name} onChange={(e) => selectItem.props.name = e.target.value}></Input>
              </div>
            }
            {itemProps.indexOf('label') >= 0 &&
              <div className="config-item-line">
                <span> 标签名：</span>
                <Input value={selectItem.props.label} onChange={(e) => selectItem.props.label = e.target.value}></Input>
              </div>
            }
            {itemProps.indexOf('placeholder') >= 0 &&
              <div className="config-item-line">
                <span>占位内容：</span>
                <Input value={selectItem.props.placeholder} onChange={(e) => selectItem.props.placeholder = e.target.value}></Input>
              </div>
            }
            {itemProps.indexOf('required') >= 0 &&
              <div className="config-item-line">
                <span>是否必填：</span>
                <Switch checked={selectItem.props.required} onChange={(e) => selectItem.props.required = e} />
                {/* <Input value={selectItem.props.placeholder} onChange={(e) => selectItem.props.placeholder = e.target.value}></Input> */}
              </div>
            }
            {itemProps.indexOf('defaultValue') >= 0 &&
              <div className="config-item-line">
                <span>默认值：</span>
                <Input value={selectItem.props.defaultValue} onChange={(e) => selectItem.props.defaultValue = e.target.value}></Input>
              </div>
            }
            {itemProps.indexOf('dataSource') >= 0 &&
              <div className="config-item-line">
                <span>选项：</span>
                <Button
                  size='small'
                  onClick={() => selectItem.props.dataSource.push({ label: 'label', value: 'value' })}
                >新增</Button>
                {selectItem.props.dataSource.map((item, index) => {
                  return <div className="options">
                    <Input value={item.label} onChange={(e) => item.label = e.target.value}></Input>
                    <Input value={item.value} onChange={(e) => item.value = e.target.value}></Input>
                    <Icon
                      className='pointer'
                      type="close-circle"
                      onClick={() => selectItem.props.dataSource.splice(index, 1)}
                    />
                  </div>
                })}             
              </div>
            }
          </>
        }
      </div>
    )
  }
}

export default ConfigItem;