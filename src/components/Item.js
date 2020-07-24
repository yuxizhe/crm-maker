import React from 'react';
import { Button, Input, Select, TimePicker, DatePicker, Checkbox, Radio, Divider, Descriptions} from 'antd';

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const DescriptionsItem = Descriptions.Item;

class Item extends React.Component {
  
  render() {
    let element = this.props.element;
    return (
      <div>
        {element.componentText}: 
        {element.componentName === 'Button' &&
          <Button>
            {element.componentText}
          </Button>
        }
        {element.componentName === 'Input' &&
          <Input />
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
          <TextArea />
        }
        {element.componentName === 'Select' &&
            <Select style={{ width: 120 }}>
              {element.props.dataSource.map(item => (
                  <Option key={item.value} label={item.label} value={item.value}>
                    {item.label}
                  </Option>
                ))
              }
            </Select>
        }
        {element.componentName === 'RadioGroup' &&
          <RadioGroup>
            {element.props.dataSource.map(item => (
                <Radio key={item.value} label={item.label} value={item.value}>
                  {item.label}
                </Radio>
              ))
            }
          </RadioGroup>
        }
        {element.componentName === 'CheckboxGroup' &&
          <CheckboxGroup>
            {element.props.dataSource.map(item => (
                <Checkbox key={item.value} label={item.label} value={item.value}>
                  {item.label}
                </Checkbox>
              ))
            }
          </CheckboxGroup>
        }
        {element.componentName === 'TimePicker' &&
          <TimePicker />
        }
        {element.componentName === 'DatePicker' &&
          <DatePicker />
        }
        {element.componentName === 'RangePicker' &&
          <RangePicker />
        } 
      </div>
    )
  }
}

export default Item