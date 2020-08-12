import React from 'react';
import { Layout } from 'antd';
import { Provider } from 'mobx-react';
import stores from './stores/';
import './style/AntD.less';
import './style/App.less';

import Drawer from './components/Drawer';
import Editor from './components/Editor';
import ConfigItem from './components/Config';

const { Header, Content, Sider } = Layout;

const App = () => (
  <div className="App">
    <Provider {...stores}>
      <Layout>
        <Header>CRM生成器</Header>
        <Layout>
          <Sider collapsible width={190}>
            <Drawer />
          </Sider>
          <Content>
            <Editor />
          </Content>
          <Sider collapsible>
            设置栏
            <ConfigItem />
          </Sider>
        </Layout>
      </Layout>
    </Provider>
  </div>
);

export default App;