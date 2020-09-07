import React from 'react';
import { inject, observer } from 'mobx-react';
import { Drawer, Tabs, Modal, Upload, Icon, message, Spin, Radio, Button } from 'antd';
import { Controlled as CodeMirror } from 'react-codemirror2'
import { prettierCode, forceDownload } from "../util";
import formPost from '../util/formPost';
import getParameters from '../util/schema2paramter';
import generageCode from '../util/DSL';
import enrichSchema from '../util/schemaEnrich';
import aiToJson from '../util/AI2JSON';

require('codemirror/mode/javascript/javascript');

const { TabPane } = Tabs;

@inject('DSL')
@observer
class Generage extends React.Component {
  constructor(props) {
    super(props);
    this.DSL = this.props.DSL;
    this.state = {
      schema: '',
      code: '',
      store: '',
      type: 'schema',
      input: '',
      drawerShow: false,
      modalShow: false,
      aiLoading: false,
      aiType: 'modal',
      fits: [
        'https://cdn.jsdelivr.net/gh/dappwind/image/20200613170942.png',
        'https://cdn.jsdelivr.net/gh/dappwind/image/20200613171518.png',
        'https://cdn.jsdelivr.net/gh/dappwind/image/20200613171605.png',
        'https://cdn.jsdelivr.net/gh/dappwind/image/20200613171641.png'],
    }
  }

  componentDidMount() {
    this.getLocalstorage();
  }

  setLocalstorage = () => {
    localStorage.setItem('crm-editor-json', JSON.stringify(this.DSL.schema));
  }

  getLocalstorage = () => {
    const localJson = localStorage.getItem('crm-editor-json');
    if (localJson) {
      const json = JSON.parse(localJson);
      this.DSL.schema = json;
    }
  }

  importSchema = () => {
    this.setState({
      schema: prettierCode(JSON.stringify(this.DSL.schema), 'json'),
      type: 'input',
      drawerShow: true,
    })
  }
  exportSchema = () => {
    this.setState({
      schema: prettierCode(JSON.stringify(this.DSL.schema), 'json'),
      type: 'schema',
      drawerShow: true,
    })
    this.setLocalstorage();
  }

  generageCode = () => {
    const enriched = enrichSchema(this.DSL.schema);
    const DSLcode = generageCode(enriched);
    this.setState({
      code: DSLcode.panelDisplay[0].panelValue,
      store: DSLcode.panelDisplay[1].panelValue,
      type: 'code',
      drawerShow: true,
    })
    this.setLocalstorage();
  }

  getAI = (data, aiType) => {
    try {
      aiToJson(data, this.DSL.schema, aiType);
    } catch (error) {
      console.error(error);
      message.error('解析失败');
    }
  }

  openSandBox = () => {
    const url = 'https://codesandbox.io/api/v1/sandboxes/define';
    const parameters = getParameters(this.DSL.schema);
    this.setLocalstorage();
    formPost(url, { parameters });
  }

  clear = () => {
    this.DSL.initSchema()
  }

  render() {
    return (
      <>
        <span className="generate-button" onClick={() => this.setState({modalShow: true})}>智能识别表单图片</span>
        <span className="generate-button" onClick={this.clear}>清空</span>
        <span className="generate-button" onClick={this.importSchema}>导入schema</span>
        <span className="generate-button" onClick={this.exportSchema}>导出schema</span>
        <span className="generate-button" onClick={this.generageCode}>生成代码</span>
        <span className="generate-button" onClick={this.openSandBox}>沙盒预览</span>
        <Drawer
          // title={this.state.title}
          placement="right"
          closable={false}
          width={'60vw'}
          onClose={() => this.setState({ drawerShow: false })}
          visible={this.state.drawerShow}
          style={{ overflow: 'scroll' }}
        >
          {this.state.type === 'schema' &&
            <CodeMirror
              value={this.state.schema}
              options={{
                lineNumbers: true,
                theme: 'material',
              }}
            />
          }
          {this.state.type === 'code' &&
            <Tabs>
              <TabPane tab="index.js" key="1">
                <CodeMirror
                  value={this.state.code}
                  options={{
                    lineNumbers: true,
                    theme: 'material',
                  }}
                />
              </TabPane>
              <TabPane tab="store.js" key="2">
                <CodeMirror
                  value={this.state.store}
                  options={{
                    lineNumbers: true,
                    theme: 'material',
                  }}
                />
              </TabPane>
            </Tabs>
          }
          {this.state.type === 'input' &&
            <>
              <div>请将schema数据粘贴到下方</div>
              <br />
              <CodeMirror
                value={this.state.schema}
                options={{
                  lineNumbers: true,
                }}
                onBeforeChange={(editor, data, value) => {
                  this.setState({schema: value});
                }}
                onChange={(editor, data, value) => {
                  try {
                    this.DSL.schema = JSON.parse(value);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              />
            </>
          }
        </Drawer>
        <Modal
          visible={this.state.modalShow}
          footer={null}
          onCancel={() => this.setState({modalShow: false})}
        >
          <div style={{marginBottom: '10px'}}>
            <span>类型 : </span>
            <Radio.Group
              onChange={(e) => this.setState({aiType: e.target.value})}
              value={this.state.aiType}
            >
              <Radio label={'生成Modal弹窗'} value={'modal'}>
                生成Modal弹窗
              </Radio>
              <Radio label={'生成页面表单'} value={'form'}>
                生成页面表单
              </Radio>
            </Radio.Group>
          </div>
          <Spin spinning={this.state.aiLoading} tip="识别中...">
            <Upload.Dragger
              name='file'
              multiple={false}
              action="https://api.dappwind.com/ai/generate/form"
              onChange={(info) => {
                const { status, response } = info.file;
                if (status === 'uploading') {
                  this.setState({aiLoading: true})
                }
                if (status === 'done') {
                  message.success('图片解析成功')
                  this.setState({aiLoading: false, modalShow: false})
                  this.getAI(response.data, this.state.aiType)
                } else if (status === 'error') {
                  message.error(`${info.file.name} 图片解析失败`);
                }
              }}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p>请选择或拖拽上传待识别的图片</p>
            </Upload.Dragger>
          </Spin>
          <div style={{marginTop: '10px'}}>
            <Button onClick={() => forceDownload(this.state.fits[0])}>下载示例图片</Button>
          </div>
        </Modal>
      </>
    )
  }
}

export default Generage;
