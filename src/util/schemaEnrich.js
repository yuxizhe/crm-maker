/**
 * 扩展schema
 * 提供一个enrich schema的功能，能把结构版/简版的schema扩展为标准schema
 * @param {object} jsonData 
 */

let schemaString = ''

function processItem(item) {
  let child;
  // 是否是表单项
  if (item.componentType === 'FormItem') {
    child = {
      "componentName": "FormItem",
      "props": {
        "label": item.props.label,
        "name": item.props.name,
        "defaultValue": item.props.defaultValue,
        "rules": item.rules || [],
      },
      "children": [{
        ...item,
        props: {
          dataSource: item.props.dataSource,
          placeholder: item.props.placeholder
        }
      }]
    }
  // 非表单项 纯受控组件
  } else if (item.componentType === 'InputItem' && item.props.label) {
    child = {
      componentName: "Span",
      props: {
        style: "{{{margin: '0px 10px'}}}",
        name: item.props.name,
      },
      children: [
        {
          componentName: 'Text',
          children: item.props.label + ' : ',
        },
        {
          ...item,
          props: {
            // name: item.props.name,
            style: "{{{maxWidth: '150px'}}}",
            allowClear: true,
            dataSource: item.props.dataSource,
            placeholder: item.props.placeholder
          }
        }
      ]
    }
  } else {
    child = item
  }
  return child;
}

function processContainer(item) {
  let container;
  // 容器类组件
  if (item.componentName === 'Table') {
    container = {
      "componentName": "Table",
      "props": {
        "dataSource": item.props.defaultValue,
        "name": item.props.name,
      },
      "children": item.props.dataSource.map(item => {
        return {
          'componentName': 'TableColumn',
          'props': {
            'title': item.label,
            'dataIndex': item.value,
            'key': item.value
          }
        }
      }),
    }
    // 操作栏 生成 functions
    if (item.props.functions && item.props.functions.length > 0) {
      container.children.push({
        'componentName': 'TableColumn',
        'props': {
          'title': '操作',
          'render':'{{(text, record, index) => (<div>'
          + (schemaString.match('onModalEdit') && '<Button style={{ marginRight: 12 }} type="default" size="small" onClick={() => this.onModalEdit(record, index)}>编辑</Button>')
          + (schemaString.match('onTableItemDelete') && '<Button style={{ marginRight: 12 }} type="danger" size="small" onClick={() => confirm({ title: "确认删除吗?", onOk: () => { this.store.deleteDateList(record.id);},okText: "确认",cancelText: "取消",})}>删除</Button>')
          + '</div>)}}'
        }
      })
    }
  } else if (item.componentName === 'Row') {
    container = {
      "componentName": "Row",
      "props": {
      },
      "children": item.children.map(item => {
        return {
          'componentName': 'Col',
          'props': {
            'span': item.props.span
          },
          'children': item.children.map(item => processContainer(item))
        }
      }),
    }
  } else if (item.componentName === 'Modal') {
    // modal 特殊处理
    container = 
      {
        ...item,
        "props": {
          "name": item.props.name,
          "visible": `{{this.store.modalShow}}`,
          "onOk": `{{(e) => this.onSubmit(e, [${item.children.map(item => "'" + item.props.name + "'")}])}}`,
          "onCancel": `{{() => this.store.modalShow = false}}`
        },
        "children": [{
          "componentName": "Form",
          "props": {
          },
          "children": item.children.map(item => processContainer(item)),
        }]
      }
  } else if (item.children && Array.isArray(item.children)) {
    container = {
      ...item,
      "children": item.children.map(item => processContainer(item)),
    }
  } else {
    container = processItem(item)
  }
  return container
}

export default function (jsonData) {
  const schema = {
    "componentName": "Card",
    "props": {},
    "children": [{
      "componentName": "Form",
      "props": {
      },
      "children": [],
    }],
  }

  schemaString = JSON.stringify(jsonData);

  jsonData.children.map(item => {
    const processed = processContainer(item)
    // Modal 和 Table 不放在form里
    if (processed.componentName.match('Modal|Table')) {
      schema.children.push(processed)
    } else {
      schema.children[0].children.push(processed)
    }
    return ''
  })
  return {
    "componentName": "Page",
    "props": {},
    "children": [schema],
  }
}