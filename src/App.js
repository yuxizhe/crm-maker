import React from 'react';
import { Layout } from 'antd';
import './App.less';

import Drawer from './components/Drawer';

const { Header, Content, Sider } = Layout;

const App = () => (
  <div className="App">
    <Layout>
      <Header>CRM生成器</Header>
      <Layout>
        <Sider collapsible>
          <Drawer></Drawer>
        </Sider>
        <Content>拖拽编辑区</Content>
        <Sider collapsible>设置栏</Sider>
      </Layout>
    </Layout>
  </div>
);

export default App;