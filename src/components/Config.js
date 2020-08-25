import React from 'react';
import { inject, observer } from 'mobx-react';
import { Input, Switch, Icon, Button, Select } from 'antd';
const { Option } = Select;

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
            {selectItem.componentType.indexOf('Item') >= 0 &&
              <div className="config-item-line">
                <span>是否是FormItem：</span>
                <Switch checked={selectItem.componentType === 'FormItem'} onChange={(e) => selectItem.componentType = e ? "FormItem":"InputItem"} />
                {/* <Input value={selectItem.props.placeholder} onChange={(e) => selectItem.props.placeholder = e.target.value}></Input> */}
              </div>
            }
            {itemProps.indexOf('placeholder') >= 0 &&
              <div className="config-item-line">
                <span>占位内容：</span>
                <Input value={selectItem.props.placeholder} onChange={(e) => selectItem.props.placeholder = e.target.value}></Input>
              </div>
            }
            {itemProps.indexOf('extra') >= 0 &&
              <div className="config-item-line">
                <span>说明内容：extra</span>
                <Input value={selectItem.props.extra} onChange={(e) => selectItem.props.extra = e.target.value}></Input>
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
                  onClick={() => selectItem.props.dataSource.push(JSON.parse(JSON.stringify(selectItem.props.props)))}
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
            {itemProps.indexOf('functions') >= 0 &&
              <div className="config-item-line">
                <span>function：</span>
                <Select
                  value={selectItem.props.onClick}
                  onChange={(e) => selectItem.props.onClick = e}
                >
                  {selectItem.props.functions.map(item => {
                    return <Option value={item}>{item}</Option>
                  })}
                </Select>
              </div>
            }
          </>
        }
      </div>
    )
  }
}

export default ConfigItem;