import React from 'react';
import {inject, observer} from 'mobx-react';
import { Button, Input, InputNumber, Select, TimePicker, DatePicker, Checkbox, Radio, Divider, Descriptions, Table, Form, Upload, Icon} from 'antd';
import { randomID } from '../util';

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const DescriptionsItem = Descriptions.Item;
const FormItem = Form.Item;
@inject('DSL')
@observer
class Item extends React.Component {
  DSL = this.props.DSL

  generateTableDefaultValue = () => {
    const defaultValue = [];
    for (let i = 0; i < 3; i++) {
      const lineValue = {};
      this.props.element.props.dataSource.forEach((item) => {
        lineValue[item.value] = item.default
      });
      lineValue.rowKey = randomID();
      defaultValue.push(lineValue);
    }
    // this.props.element.props.defaultValue = defaultValue;
    return defaultValue;
  }
  render() {
    let element = this.props.element;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div className="editor-item">
        {/* {element.componentText}:  */}
        {element.componentName === 'Button' &&
          <Button>
            {element.children}
          </Button>
        }
        {element.componentName === 'Input' &&
          <FormItem
            {...formItemLayout}
            label={element.props.label}
            required={element.props.required}
            extra={element.props.extra}
          >
            <Input
              placeholder={element.props.placeholder}
              value={element.props.defaultValue}
              onChange={(e) => {element.props.defaultValue = e.target.value}}
            />
          </FormItem>
        }
        {element.componentName === 'InputNumber' &&
          <FormItem
            {...formItemLayout}
            label={element.props.label}
            required={element.props.required}
            extra={element.props.extra}
          >
            <InputNumber
              placeholder={element.props.placeholder}
              value={element.props.defaultValue}
              onChange={(e) => {element.props.defaultValue = e}}
            />
          </FormItem>
        }
        {element.componentName === 'DescriptionsItem' &&
          <DescriptionsItem label={element.props.label}>
            {element.props.defaultValue}
          </DescriptionsItem>
        }
        {element.componentName === 'Divider' &&
          <Divider />
        }
        {element.componentName === 'TextArea' &&
          <FormItem
            {...formItemLayout}
            label={element.props.label}
            required={element.props.required}
            extra={element.props.extra}
          >
            <TextArea placeholder={element.props.placeholder}/>
          </FormItem>
        }
        {element.componentName === 'Select' &&
          <FormItem
            {...formItemLayout}
            label={element.props.label}
            required={element.props.required}
            extra={element.props.extra}
          >
            <Select style={{ width: 120 }} placeholder={element.props.placeholder}>
              {element.props.dataSource.map(item => (
                  <Option key={item.value} label={item.label} value={item.value}>
                    {item.label}
                  </Option>
                ))
              }
            </Select>
          </FormItem>
        }
        {element.componentName === 'RadioGroup' &&
          <FormItem
            {...formItemLayout}
            label={element.props.label}
            required={element.props.required}
            extra={element.props.extra}
          >
            <RadioGroup>
              {element.props.dataSource.map(item => (
                  <Radio key={item.value} label={item.label} value={item.value}>
                    {item.label}
                  </Radio>
                ))
              }
            </RadioGroup>
          </FormItem>
        }
        {element.componentName === 'CheckboxGroup' &&
          <FormItem
            {...formItemLayout}
            label={element.props.label}
            required={element.props.required}
            extra={element.props.extra}
          >
            <CheckboxGroup>
              {element.props.dataSource.map(item => (
                  <Checkbox key={item.value} label={item.label} value={item.value}>
                    {item.label}
                  </Checkbox>
                ))
              }
            </CheckboxGroup>
          </FormItem>
        }
        {element.componentName === 'TimePicker' &&
          <FormItem
            {...formItemLayout}
            label={element.props.label}
            required={element.props.required}
            extra={element.props.extra}
          >
            <TimePicker />
          </FormItem>
        }
        {element.componentName === 'DatePicker' &&
          <FormItem
            {...formItemLayout}
            label={element.props.label}
            required={element.props.required}
            extra={element.props.extra}
          >
            <DatePicker />
          </FormItem>
        }
        {element.componentName === 'RangePicker' &&
          <FormItem
            {...formItemLayout}
            label={element.props.label}
            required={element.props.required}
            extra={element.props.extra}
          >
            <RangePicker />
          </FormItem>
        }
        {element.componentName === 'Upload' &&
          <FormItem
            {...formItemLayout}
            label={element.props.label}
            required={element.props.required}
            extra={element.props.extra}
          >
            <Upload>
              <Button>
                <Icon type="upload" /> 点击上传图片
              </Button>
            </Upload>
          </FormItem>
        }
        {element.componentName === 'Table' &&
          <Table
            dataSource={this.generateTableDefaultValue()}
            rowKey="rowKey"
          >
            {
              element.props.dataSource.map(item => 
              <Table.Column
                title={item.label}
                dataIndex={item.value}
                key={item.value}
              />)
            }
            <Table.Column
              title='操作'
              render={() => <>
                <Button>编辑</Button>
                <Button>删除</Button>
              </>
              } />
          </Table>
        }
      </div>
    )
  }
}

export default Item