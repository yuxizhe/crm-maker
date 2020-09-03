import React from 'react';
import { inject, observer } from 'mobx-react';
import { Input, Switch, Icon, Button, Select, InputNumber } from 'antd';
// import { randomID } from '../util';
import { basicComponents } from './InitJson';
const { Option } = Select;

@inject('DSL')
@observer
class ConfigItem extends React.Component {
  constructor(props) {
    super(props);
    this.DSL = this.props.DSL;
    const components = basicComponents;
    const componentsMap = {};
    components.map(item => componentsMap[item.componentName] = item)
    this.state = {
      components,
      componentsMap,
    }
  }

  deleteItem = () => {
    if (this.DSL.selectItemParent) {
      this.DSL.selectItemParent.splice(this.DSL.selectItemIndex, 1)
      this.DSL.selectItem = {}
    }
  }

  setRequired = (e) => {
    this.DSL.selectItem.props.required = e;
    if (e) {
      this.DSL.selectItem.rules = [{
        required: true, message: this.DSL.selectItem.props.label + '必填'
      }]
    } else {
      this.DSL.selectItem.rules = []
    }
  }

  componentNameChange = (e) => {
    const newItem = this.state.componentsMap[e];
    const oldItem = this.DSL.selectItem;
    const oldLabel = oldItem.props.label;

    this.DSL.selectItem.componentName = e;
    this.DSL.selectItem.componentType = newItem.componentType;
    this.DSL.selectItem.props = Object.assign(newItem.props, {
      label: oldLabel,
      name: oldItem.props.name,
      key: oldItem.props.key
    });
  }

  render() {
    let selectItem = this.DSL.selectItem;
    const itemProps = (selectItem && selectItem.props) ? Object.keys(selectItem.props) : ''
    return (
      <div>
        {
          itemProps &&
          <>
            <div className="config-item-line">
              <span> 组件类型：</span>
              <Select
                dropdownMatchSelectWidth={false}
                showSearch={true}
                style={{width: '100%'}}
                value={selectItem.componentName}
                onChange={this.componentNameChange}
              >
                {this.state.components.map(item => {
                  return <Option value={item.componentName}>{item.componentText}({item.componentName})</Option>
                })}
              </Select>
            </div>
            <div className="config-item-line">
              <span> 操作：</span>
              <Button size='small' onClick={this.deleteItem}>删除</Button>
            </div>
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
            {selectItem.children !== undefined && typeof(selectItem.children) === 'string' &&
              <div className="config-item-line">
                <span> 显示内容：</span>
                <Input value={selectItem.children} onChange={(e) => selectItem.children = e.target.value}></Input>
              </div>
            }
            {selectItem.componentType && selectItem.componentType.indexOf('Item') >= 0 &&
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
                <Switch checked={selectItem.props.required} onChange={this.setRequired} />
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
            {selectItem.componentName === 'Row' &&
              <div className="config-item-line">
                <span>分栏Col：</span>
                <Button
                  size='small'
                  onClick={() => selectItem.children.push(JSON.parse(JSON.stringify(selectItem.props.props)))}
                >新增</Button>
                {selectItem.children.map((item, index) => {
                  return <div className="options">
                    <span> Col宽度: </span>
                    <InputNumber value={item.props.span} onChange={(e) => item.props.span = e}></InputNumber>
                    <Icon
                      className='pointer'
                      type="close-circle"
                      onClick={() => selectItem.children.splice(index, 1)}
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
                  style={{width: '100%'}}
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