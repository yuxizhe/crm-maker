import React from 'react';
import { inject, observer } from 'mobx-react';
import { Input, Tag, Button } from 'antd';

const { TextArea } = Input;

@inject("DSL")
@observer
class DataImport extends React.Component {
  DSL = this.props.DSL;
  dataKeysNames = this.DSL.schema.dataKeysNames;
  pasteDate = (e) => {
    this.DSL.pasteDate = e.target.value;
    let textArray = e.target.value.replaceAll('\n','\t').split('\t');
    console.log(textArray);
    textArray = textArray.filter(e => {
      if(e.match(/是|否|无|string|long|integer|int|bigdecimal/) || e.length === 0) {
        return false;
      } else {
        return true;
      }
    });
    // 数组去重
    textArray = [...new Set(textArray)];
    console.log(textArray);
    
    textArray.map(e => {
      // 区分变量与中文名
      if (e.match(/^(\w|\d|_|-)+$/)) {
        this.dataKeysNames.keys.push(e);
      } else {
        this.dataKeysNames.names.push(e);
      }
      return '';
    })
    setTimeout(() => {
      this.DSL.pasteDate = '';
    }, 1000)
  }
  clear = () => {
    this.dataKeysNames.keys = [];
    this.dataKeysNames.names = [];
  }
  render() {
    return(
      <div className="config-item-line">
        <span> 粘贴数据：</span>
        <TextArea
          value={this.DSL.pasteDate}
          onChange={this.pasteDate}
          placeholder='请将docs中接口字段的表格粘贴到这里'
        ></TextArea>
        
        <p>变量:</p>
        {this.dataKeysNames.keys && this.dataKeysNames.keys.map(e => {
          return <Tag key={e}>{e}</Tag>
        })}
        <p>变量名:</p>
        {this.dataKeysNames.names && this.dataKeysNames.names.map(e => {
          return <Tag key={e}>{e}</Tag>
        })}
        <br />
        <br />
        <Button type="primary" onClick={this.clear} size='small'>清空数据</Button>
      </div>
    )
  }
} 

export default DataImport;
