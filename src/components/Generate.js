import React from 'react';
import { inject, observer } from 'mobx-react';
import { Drawer, Tabs } from 'antd';
import { Controlled as CodeMirror } from 'react-codemirror2'
import { prettierCode } from "../util";
import generageCode from '../util/DSL';
import enrichSchema from '../util/schemaEnrich';

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
  }

  clear = () => {
    this.DSL.initSchema()
  }

  render() {
    return (
      <>
        <span className="generate-buttom" onClick={this.clear}>清空</span>
        <span className="generate-buttom" onClick={this.importSchema}>导入schema</span>
        <span className="generate-buttom" onClick={this.exportSchema}>导出schema</span>
        <span className="generate-buttom" onClick={this.generageCode}>生成代码</span>
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
      </>
    )
  }
}

export default Generage;
