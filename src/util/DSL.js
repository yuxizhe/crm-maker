import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
//import moment from 'moment';
export default function (schema, option = {
  responsive: {
    width: 750,
    viewportWidth: 375
  },
  utils: {
  },
  componentsMap: { list: [] }
}) {

  // imports
  const imports = [];

  // antd imports
  const antdImport = []

  // sub imports
  const subImports = [];

  // inline style
  const style = {};

  // Global Public Functions
  const utils = [];

  // Classes 
  const classes = [];

  // mobx
  const mobxVar = [];

  // mobxModal
  const mobxModalVar = [];

  // mobx function
  const mobxFunction = [];

  // 1vw = width / 100
  const _w = 750;

  const componentsMap = option.componentsMap;
  const components = [];

  // 转成string 通过match判断是否需要某些功能
  const schemaString = JSON.stringify(schema);

  // 处理 import 相关
  const importComponent = (type) => {
    let result = '';

    if (!componentsMap || !componentsMap.list) {
      return result;
    }

    if (componentsMap && !components.includes(type)) {
      // not find in componentsMap
      // antd sub model
      if (type === 'FormItem') {
        subImports.push('const FormItem = Form.Item')
      } else if (type === 'Option') {
        subImports.push('const { Option } = Select')
      } else if (type === 'RadioGroup') {
        subImports.push('const RadioGroup = Radio.Group')
      } else if (type === 'CheckboxGroup') {
        subImports.push('const CheckboxGroup = Checkbox.Group')
      } else if (type === 'TextArea') {
        subImports.push('const { TextArea } = Input')
      } else if (type === 'TableColumn') {
        subImports.push('const TableColumn = Table.Column')
      } else if (type === 'DescriptionsItem') {
        subImports.push('const DescriptionsItem = Descriptions.Item')
      } else if (type === 'RangePicker') {
        subImports.push('const { RangePicker } = DatePicker')
        antdImport.indexOf('DatePicker') == -1 && antdImport.push('DatePicker');
      } else {
        antdImport.push(type);
      }
      components.push(type);
    }
  };

  // 处理mobx相关
  const mobxComponent = (type, schema, nameChain) => {
    if (type === 'FormItem' || type === 'DescriptionsItem' || type === 'Div' || type === 'Span') {
      // modal里的变量单独处理
      if (nameChain.match('Modal')) {
        mobxModalVar.push(schema.props.name);
        return;
      }
      if (schema.props.defaultValue) { // defaultValue处理
        if (schema.children && schema.children[0] && (schema.children[0].componentName.match(/^(DatePicker|TimePicker|RangePicker)/))) {
          if (Array.isArray(schema.props.defaultValue)) {
            const defaultValue = `[${schema.props.defaultValue.map((m) => `moment('${m}')`)}]`;
            mobxVar.push(`@observable ${schema.props.name} =${defaultValue}`)
          } else {
            mobxVar.push(`@observable ${schema.props.name} =moment('${schema.props.defaultValue}')`)
          }
        } else {
          if (typeof schema.props.defaultValue !== 'string') {
            schema.props.defaultValue = JSON.stringify(schema.props.defaultValue);
          }
          mobxVar.push(`@observable ${schema.props.name} ='${schema.props.defaultValue}'`)
        }
      } else {
        mobxVar.push(`@observable ${schema.props.name} =""`)
      }
    } else if (type === 'Modal') {
    // 处理modal相关逻辑
      mobxVar.push(`@observable modalShow = true`)

      mobxVar.push(`@observable modalType = 'add'`)

      mobxVar.push(`@observable editItemIndex = ''`)

      mobxFunction.push(`
      @action
      initModal() {
        Object.keys(this.modalData).map((key) => {
          this.modalData[key] = '';
          return '';
        });
        this.modalType = 'add';
      }
      `)

      mobxFunction.push(`
      @action
      setModal(index) {
        this.initModal();
        const record = this.dataList[index];
        this.modalData = Object.assign(this.modalData, record);

        this.modalType = 'edit';
        this.editItemIndex = index;
      }
      `)

      mobxFunction.push(`
      @action
      setDataList(formValues) {
        let datas;
        if (this.modalType === 'add') {
          datas = formValues;
        } else if (this.modalType === 'edit') {
          const oldData = this.dataList[this.editItemIndex];
          datas = Object.assign(oldData, formValues);
        }
        HttpClient.post('/mock/add_or_update', { ...datas })
          .then(action((res) => {
            if (!res.error_code) {
              message.success('操作成功！');
              this.getList();
            }
          }));
      }
      `)

    } else if (type === 'Table') {
      mobxVar.push(`
      @observable dataList = ${JSON.stringify(schema.props.dataSource)}

      @observable tablePagination = {
        current: 1,
        pageSize: 20,
        total: 100,
      }

      @observable tableLoading = false`)

      mobxFunction.push(`
      @action
      getList(page) {
        this.tableLoading = true;
        HttpClient.get('/mock/list', {
          page,
        }).then(
          action((res) => {
            const { data, error_code } = res;
            this.tableLoading = false;
            if (!error_code) {
              this.dataList = data.items;
              this.tablePagination.current = data.current_page;
              this.tablePagination.total = data.total_pages;
            }
          }),
        );
      }
      `)

      mobxFunction.push(`
      @action
      deleteDateList(id) {
        HttpClient.post('/mock/delete.json', { id })
          .then(action((res) => {
            if (!res.error_code) {
              message.success('操作成功！');
              this.getList();
            }
          }));
      }
      `)

      subImports.push('const { confirm } = Modal;')
    }
  }

  const isExpression = (value) => {
    return /^\{\{.*\}\}$/.test(value);
  }

  const toString = (value) => {
    if ({}.toString.call(value) === '[object Function]') {
      return value.toString();
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value, (key, value) => {
        if (typeof value === 'function') {
          return value.toString();
        } else {
          return value;
        }
      })
    }

    return String(value);
  };

  // flexDirection -> flex-direction
  const parseCamelToLine = (string) => {
    return string.split(/(?=[A-Z])/).join('-').toLowerCase();
  }

  // parse function, return params and content
  const parseFunction = (func) => {
    const funcString = func.toString();
    const params = funcString.match(/\([^\(\)]*\)/)[0].slice(1, -1);
    const content = funcString.slice(funcString.indexOf('{') + 1, funcString.lastIndexOf('}'));
    return {
      params,
      content
    };
  }

  // parse layer props(static values or expression)
  const parseProps = (value, isReactNode) => {
    if (typeof value === 'string') {
      if (isExpression(value)) {
        if (isReactNode) {
          return value.slice(1, -1);
        } else {
          return value.slice(2, -2);
        }
      }

      if (isReactNode) {
        return value;
      } else {
        return `'${value}'`;
      }

    } else if (typeof value === 'function') {
      const { params, content } = parseFunction(value);
      return `(${params}) => {${content}}`;
    } else if (typeof value === 'boolean') {
      return value;
    } else if (typeof value === 'object') {
      return JSON.stringify(value);
    } else if (typeof value === 'number') {
      return value;
    }
  }

  // parse async dataSource
  const parseDataSource = (data) => {
    const name = data.id;
    const { uri, method, params } = data.options;
    const action = data.type;
    let payload = {};

    switch (action) {
      case 'fetch':
        if (imports.indexOf(`import {fetch} from whatwg-fetch`) === -1) {
          imports.push(`import {fetch} from 'whatwg-fetch'`);
        }
        payload = {
          method: method
        };

        break;
      case 'jsonp':
        if (imports.indexOf(`import {fetchJsonp} from fetch-jsonp`) === -1) {
          imports.push(`import jsonp from 'fetch-jsonp'`);
        }
        break;
    }

    Object.keys(data.options).forEach((key) => {
      if (['uri', 'method', 'params'].indexOf(key) === -1) {
        payload[key] = toString(data.options[key]);
      }
    });

    // params parse should in string template
    if (params) {
      payload = `${toString(payload).slice(0, -1)} ,body: ${isExpression(params) ? parseProps(params) : toString(params)}}`;
    } else {
      payload = toString(payload);
    }

    let result = `{
      ${action}(${parseProps(uri)}, ${toString(payload)})
        .then((response) => response.json())
    `;

    if (data.dataHandler) {
      const { params, content } = parseFunction(data.dataHandler);
      result += `.then((${params}) => {${content}})
        .catch((e) => {
          console.log('error', e);
        })
      `
    }

    result += '}';
    return `${name}() ${result}`;
  }

  // parse condition: whether render the layer
  const parseCondition = (condition, render) => {
    if (typeof condition === 'boolean') {
      return `${condition} && ${render}`
    } else if (typeof condition === 'string') {
      return `${condition.slice(2, -2)} && ${render}`
    }
  }

  // parse loop render
  const parseLoop = (loop, loopArg, render) => {
    let data;
    let loopArgItem = (loopArg && loopArg[0]) || 'item';
    let loopArgIndex = (loopArg && loopArg[1]) || 'index';

    if (Array.isArray(loop)) {
      data = toString(loop);
    } else if (isExpression(loop)) {
      data = loop.slice(2, -2);
    }

    // add loop key
    const tagEnd = render.match(/^<[^\s>]+/)[0].length;
    render = `${render.slice(0, tagEnd)} key={${loopArgIndex}}${render.slice(tagEnd)}`;

    // remove `this` 
    const re = new RegExp(`this.${loopArgItem}`, 'g')
    render = render.replace(re, loopArgItem);

    return `${data}.map((${loopArgItem}, ${loopArgIndex}) => {
      return (${render});
    })`;
  }

  // 组件引入&变量引入
  const parseComponentAndMobx = (type, schema, nameChain) => {
    // antd import处理
    importComponent(type);

    // mobx 处理
    mobxComponent(type, schema, nameChain)
  }

  // generate render xml
  const generateRender = (schema, parentSchema, nameChain) => {
    let type = schema.componentName;
    const className = schema.props && schema.props.className;
    const classString = className ? ` style={styles.${className}}` : '';

    if (className) {
      style[className] = schema.props.style;
    }

    let xml;
    let props = '';

    // form onsubmit 函数
    // if (type === 'Form' && !schema.props.onSubmit) {
    //   schema.props['onSubmit'] = "{{this.onSubmit}}";
    //   console.log(schema.props)
    // }
    Object.keys(schema.props || {}).forEach((key) => {
      if (['className', 'text', 'src', 'dataSource', 'rules', 'defaultValue'].indexOf(key) === -1) {
        props += ` ${key}={${parseProps(schema.props[key])}}`;
      }
    })

    // type 预处理，把fusion design的 组件转为 antd格式
    switch (type) {
      case 'NumberPicker':
        type = 'InputNumber'
        break;
      case 'ButtonGroup':
        type = 'div'
        break;
      default:
        break;
    }

    // form样式
    if (['FormItem'].includes(type)) {
      props += `{...formItemLayout}`
    }

    // select 选择 的 option dataSource 扩展为 scheme children
    if (['Select', 'RadioGroup', 'CheckboxGroup'].includes(type)) {
      const childItems = {
        'Select': 'Option',
        'RadioGroup': 'Radio',
        'CheckboxGroup': 'Checkbox'
      }
      if (schema.props.dataSource && schema.props.dataSource.length > 0) {
        schema.children = [];
        schema.props.dataSource.map(item => {
          schema.children.push({
            "componentName": childItems[type],
            "props": {
              "label": item.label,
              "value": item.value,
            },
            "children": item.label
          })
        })
      }
    }

    const modalStore = nameChain && nameChain.match('Modal') ? 'modalData.' : '';
    const newNameChain = `${nameChain}-${type}`;

    switch (type) {
      case 'Text':
        const innerText = schema.children;
        xml = `<span${classString}${props}>${innerText}</span>`;
        break;
      case 'Image':
        const source = parseProps(schema.props.src);
        xml = `<img${classString}${props} src={${source}} />`;
        break;
      case 'Span':
        if (schema.children && schema.children.length) {
          xml = `<span${classString}${props}>${transform(schema.children, schema, newNameChain)}</span>`;
        } else {
          xml = `<span${classString}${props} />`;
        }
        break;
      case 'Div':
      case 'Page':
      case 'Block':
      case 'Component':
        if (schema.children && schema.children.length) {
          xml = `<div${classString}${props}>${transform(schema.children, schema, newNameChain)}</div>`;
        } else {
          xml = `<div${classString}${props} />`;
        }
        break;
      // antd 组件元素处理
      case 'FormItem':

        xml = `
          <${type}${classString}${props}>
            {getFieldDecorator('${schema.props.name}', {
              initialValue: this.store.${modalStore}${schema.props.name},
              rules: ${JSON.stringify(schema.props.rules)}
            })(
              ${transform(schema.children, schema, newNameChain)},
            )}
          </${type}>`;
        break;

      case 'Table':
        xml = `<${type}${classString}${props} 
          pagination={this.store.tablePagination} 
          loading={this.store.tableLoading}
          dataSource={this.store.dataList}
          onChange={e => this.store.getList(e.current)}
        >${transform(schema.children)}</${type}>`;
        break;

      case 'Input':
      case 'TextArea':
      case 'RadioGroup':
        if (schema.children && schema.children.length) {
          xml = `<${type}${classString}${props} 
                  onChange={e => this.store.${modalStore}${parentSchema ? parentSchema.props.name : 'none'} = e.target.value} 
                 >
                 ${transform(schema.children)}</${type}>`;
        } else {
          xml = `<${type}${classString}${props} 
                  onChange={e => this.store.${modalStore}${parentSchema ? parentSchema.props.name : 'none'} = e.target.value} 
                />`;
        }
        break;
      case 'Select':
      case 'CheckboxGroup':
      case 'InputNumber':
      case 'Slider':
        if (schema.children && schema.children.length) {
          xml = `<${type}${classString}${props} 
                  onChange={e => this.store.${modalStore}${parentSchema ? parentSchema.props.name : 'none'} = e}
                 >
                 ${transform(schema.children)}</${type}>`;
        } else {
          xml = `<${type}${classString}${props} 
                  onChange={e => this.store.${modalStore}${parentSchema ? parentSchema.props.name : 'none'} = e} 
                />`;
        }
        break;

      case 'DatePicker':
      case 'TimePicker':
      case 'RangePicker':
        xml = `<${type}${classString}${props} 
              onChange={(date, dateString) => this.store.${modalStore}${parentSchema ? parentSchema.props.name : 'none'} = dateString} 
              />`;
        break;
      case 'DescriptionsItem':
        xml = `<${type}${classString}${props}>{this.store.${schema.props.name}}</${type}>`;
        break;
      default:
        if (schema.children && schema.children.length) {
          xml = `<${type}${classString}${props}>${transform(schema.children, schema, newNameChain)}</${type}>`;
        } else {
          xml = `<${type}${classString}${props} />`;
        }
        break;
    }

    parseComponentAndMobx(type, schema, newNameChain)

    if (schema.loop) {
      xml = parseLoop(schema.loop, schema.loopArgs, xml)
    }
    if (schema.condition) {
      xml = parseCondition(schema.condition, xml);
    }
    if (schema.loop || schema.condition) {
      xml = `{${xml}}`;
    }

    return xml;
  }

  const prettierCode = (code) => {
    try {
      return prettier.format(code, prettierOpt)
    } catch (error) {
      console.error(error)
      debugger
      return code
    }
  }
  // parse schema
  const transform = (schema, parentSchema, nameChain) => {
    let result = '';

    if (Array.isArray(schema)) {
      schema.forEach((layer) => {
        result += transform(layer, parentSchema, nameChain);
      });
    } else if (typeof schema === 'string') {
      // text string children
      result += schema;
    } else {
      if (!schema.componentName) return result;

      const type = schema.componentName.toLowerCase();

      // 容器组件处理: state/method/dataSource/lifeCycle/render
      if (['page', 'block', 'component'].indexOf(type) !== -1) {
        const states = [];
        const lifeCycles = [];
        const methods = [];
        const init = [];
        const render = [`
        render(){ 
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
        
        return (`];
        let classData = [`
        
        @observer
        class ${schema.componentName}_${classes.length} extends Component {`];

        states.push('store = store;\n')

        if (schema.state) {
          states.push(`state = ${toString(schema.state)}`);
        }

        if (schema.methods) {
          Object.keys(schema.methods).forEach((name) => {
            const { params, content } = parseFunction(schema.methods[name]);
            methods.push(`${name} = (${params}) => {${content}}`);
          });
        }

        if (schema.dataSource && Array.isArray(schema.dataSource.list)) {
          schema.dataSource.list.forEach((item) => {
            if (typeof item.isInit === 'boolean' && item.isInit) {
              init.push(`this.${item.id}();`)
            } else if (typeof item.isInit === 'string') {
              init.push(`if (${parseProps(item.isInit)}) { this.${item.id}(); }`)
            }
            methods.push(parseDataSource(item));
          });

          if (schema.dataSource.dataHandler) {
            const { params, content } = parseFunction(schema.dataSource.dataHandler);
            methods.push(`dataHandler(${params}) {${content}}`);
            init.push(`this.dataHandler()`);
          }
        }

        if (schema.lifeCycles) {
          if (!schema.lifeCycles['_constructor']) {
            lifeCycles.push(`constructor(props, context) { super(); ${init.join('\n')}}`);
          }

          Object.keys(schema.lifeCycles).forEach((name) => {
            const { params, content } = parseFunction(schema.lifeCycles[name]);

            if (name === '_constructor') {
              lifeCycles.push(`constructor(${params}) { super(); ${content} ${init.join('\n')}}`);
            } else {
              lifeCycles.push(`${name}(${params}) {${content}}`);
            }
          });
        }

        render.push(generateRender(schema, parentSchema, nameChain))
        render.push(`);}`);

        classData = classData.concat(states).concat(lifeCycles).concat(methods).concat(render);
        classData.push('}');

        classes.push(classData.join('\n'));
      } else {
        result += generateRender(schema, parentSchema, nameChain);
      }
    }

    return result;
  };

  if (option.utils) {
    Object.keys(option.utils).forEach((name) => {
      utils.push(`const ${name} = ${option.utils[name]}`);
    });
  }

  // form 预处理 增加method函数
  if (!schema.methods) {
    schema.methods = []
  }

  if(schemaString.match('onSubmit')) {
    schema.methods['onSubmit'] = `function (e, fieldNames) {
      e.preventDefault();
      this.props.form.validateFields(fieldNames, (err, formValues) => {
        if (!err) {
          alert(JSON.stringify(formValues))
          // trim values
          const trimValues = formValues;
          Object.keys(trimValues).map(key => trimValues[key] = typeof trimValues[key] === 'string' ? trimValues[key].trim() : trimValues[key]);
          this.store.setDataList(trimValues);
          this.store.initModal();
          this.store.modalShow = false;
        }
      });
    };`
  }

  if(schemaString.match('onSearch')) {
    schema.methods['onSearch'] = `function () {
      this.store.getList();
    };`
  }

  if(schemaString.match('Modal')) {
    schema.methods['onModalAdd'] = `function() {
      this.props.form.resetFields();
      this.store.initModal();
      this.store.modalShow = true;
    }`
  
    schema.methods['onModalEdit'] = `function(record, index) {
      this.props.form.resetFields();
      this.store.setModal(index);
      this.store.modalShow = true;
    }`
  }

  // start parse schema
  transform(schema);

  const prettierOpt = {
    parser: 'babel',
    printWidth: 120,
    singleQuote: true,
    plugins: [parserBabel]
  };

  const indexjs = `
  import React, { Component } from 'react';
  import { observer } from 'mobx-react';
  import {${antdImport.join(', ')}} from 'antd';
  ${imports.join('\n')}
  import store from './store';
  ${utils.join('\n')}
  ${subImports.join('\n')}
    
  ${classes.join('\n')}
  export default Form.create()(${schema.componentName}_0);
  `

  const storejs = `
  import { observable, action } from 'mobx';

  import HttpClient from 'src/utils/httpclient';

  import moment from 'moment';

  class Store {
    ${mobxVar.join('\n\n')}

    ${schemaString.match('Modal') &&
      `@observable modalData = {
        ${mobxModalVar.map(item => `${item}:''\n`)}
      }`
    }

    ${mobxFunction.join('\n\n')}
  }
  export default new Store();
  `

  return {
    panelDisplay: [
      {
        panelName: 'index.js',
        panelValue: prettierCode(indexjs),
        panelType: 'js',
      },
      // 生成store
      {
        panelName: 'store.js',
        panelValue: prettierCode(storejs),
        panelType: 'js',
      },
    ],
    noTemplate: true
  };
}