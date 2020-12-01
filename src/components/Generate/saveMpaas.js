import React from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import qs from 'querystring';

const FormItem = Form.Item;

@inject('DSL')
@observer
class SaveMpaas extends React.Component {
  constructor() {
    super();
    this.state = {
      modalShow: false,
    }
  }
  componentDidMount() {
    this.getMpaas();
  }
  onSubmit = (e, fieldNames) => {
    e.preventDefault();
    this.props.setLocalstorage();
    this.props.form.validateFields(fieldNames, (err, formValues) => {
      if (!err) {
        // trim values
        const trimValues = formValues;
        Object.keys(trimValues).map(
          (key) => (trimValues[key] = typeof trimValues[key] === 'string' ? trimValues[key].trim() : trimValues[key])
        );
        trimValues.content = JSON.stringify(this.props.DSL.schema);
        console.log(trimValues);
        this.saveMpaas(trimValues);
      }
    });
  };
  saveMpaas = (values) => {
    let url = 'http://rc.mpaas.snowballfinance.com/api/crm-maker/create'
    if(this.props.DSL.mpaas.id) {
      url = 'http://rc.mpaas.snowballfinance.com/api/crm-maker/update';
      values.id = this.props.DSL.mpaas.id;
    }
    axios.post(url,qs.stringify(values))
      .then(res => {if (res.data.error_code === 0) {
        message.success('保存成功');
        this.setState({modalShow: false});
      }})
      .catch(e => {
        if(e.response.data) {
          message.error(e.response.data.error_description)
        }
    });
  }
  getMpaas = () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    this.props.DSL.mpaas.id = id;
    let mpaasJson = '';
    if (id) {
      this.props.DSL.mpaas.id = id;
      axios.get(`http://rc.mpaas.snowballfinance.com/api/crm-maker/detail?id=${id}`).then(res => {
        const data = res.data.data;
        if (data && data.content) {
          mpaasJson = JSON.parse(data.content);
          this.props.DSL.schema = mpaasJson;
          this.props.DSL.mpaas = data;
        }
      })
    }
  }
  
  saveState = (target,value) => {
    this.props.DSL.mpaas[target] = value;
  }
  render() {
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

    const { getFieldDecorator } = this.props.form;
    const { mpaas } = this.props.DSL;
    return (
      <>
        <span onClick={() => (this.setState({modalShow: true}))}>保存到mPaaS</span>
        <Modal
          visible={this.state.modalShow}
          onOk={(e) => this.onSubmit(e, ['name', 'comment', 'url'])}
          onCancel={() => (this.setState({modalShow: false}))}
        >
          <Form>
            {mpaas.id && (<b>修改ID：{mpaas.id}</b>)}
            <FormItem label={'页面名称'} name={'name'} {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: mpaas.name,
                rules: [{'required': true}],
              })(<Input placeholder={''} onChange={(e) => this.saveState('name', e.target.value)} />)}
            </FormItem>
            <FormItem label={'备注'} name={'comment'} {...formItemLayout}>
              {getFieldDecorator('comment', {
                initialValue: mpaas.comment,
                rules: [{'required': true}],
              })(<Input placeholder={''} onChange={(e) => this.saveState('comment', e.target.value)} />)}
            </FormItem>
            <FormItem label={'页面url'} name={'url'} {...formItemLayout}>
              {getFieldDecorator('url', {
                initialValue: mpaas.url,
                rules: [{'required': true}],
              })(<Input placeholder='填写对应的CRM访问地址' onChange={(e) => this.saveState('url', e.target.value)} />)}
            </FormItem>
          </Form>
        </Modal>
      </>
    )
  }
}

export default Form.create()(SaveMpaas);;