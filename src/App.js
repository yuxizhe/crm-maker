import React from 'react';
import { Layout } from 'antd';
import { Provider } from 'mobx-react';
import stores from './stores/';
import './App.less';

import Drawer from './components/Drawer';
import Editor from './components/Editor';

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
          <Sider collapsible>设置栏</Sider>
        </Layout>
      </Layout>
    </Provider>
  </div>
);

export default App;