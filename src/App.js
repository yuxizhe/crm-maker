import React from 'react';
import { Layout } from 'antd';
import { Provider } from 'mobx-react';
import stores from './stores/';
import './style/AntD.less';
import './style/App.less';

import Drawer from './components/Drawer';
import Editor from './components/Editor';
import ConfigItem from './components/Config/index';
import Generage from './components/Generate';

const { Header, Content, Sider } = Layout;

const App = () => (
  <div className="App">
    <Provider {...stores}>
      <Layout>
        <Header>
          <span className="header-title">CRM生成器</span>
          <Generage />
        </Header>
        <Layout>
          <Sider width={230}>
            <Drawer />
          </Sider>
          <Content>
            <Editor />
          </Content>
          <Sider>
            <ConfigItem />
          </Sider>
        </Layout>
      </Layout>
    </Provider>
  </div>
);

export default App;