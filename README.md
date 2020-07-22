# CRM生成器 - react antd 版
## React版
> 内网： http://f2e.snowballfinance.io/crm-maker/

## Vue 版
> 内网： http://f2e.snowballfinance.io/crm-editor/

> 外网： https://blog.dappwind.com/crm-editor/

## 目的

通过拖拽编辑、智能识别等方式 完善原型稿搭建、原型识别 功能，降低编写表单表格 UI 编码时间，有效提升 CRM 需求开发效率。

生成代码格式是雪球通用CRM框架所选用的 react antd + mobx，开发人员可直接复制使用。

## 代码结构

```
.
├── App.js
├── App.less
├── components
│   ├── Config.js         右侧组件配置
│   ├── Drawer.js         左侧组件选择抽屉
│   ├── Editor.js         中间的编辑器
│   ├── InitJson.js       组件初始化json
│   ├── Item.js           组件
│   └── ItemContainer.js  容器组件
├── stores                mobx store
├── index.css
├── index.js
└── util
    ├── AI2JSON.js        AI识别转换
    ├── DSL.js            DSL解析
    ├── index.js
    └── schemaEnrich.js   DSL扩展
```

## 代码逻辑

### schema & DSL
schema 是对页面UI的描述，像是Flutter的声明式UI
也算做是 DSL - 领域特定语言(英语:domain-specific language、 DSL)指的是专注于某个应用程序领域的计算机语言。又译作领域专用语言。

在schema里，我们会去描述一个视图完整的信息结构:节点之间的结 构特征、节点自身的 UI 特征、节点自身的逻辑特征等等，你可以在这份数据里找到你所需要的信息，从而进行更多应用层上的使用，比 如生成 DSL 代码、渲染到可视化编辑器里等等。

这里沿用阿里imgcook的schema格式，作为通用schema。点击我们编辑器上的 生成schema 就可以查看当前页面的schema


