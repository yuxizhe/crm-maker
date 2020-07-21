/**
 * 扩展schema
 * 提供一个enrich schema的功能，能把结构版/简版的schema扩展为标准schema
 * @param {object} jsonData 
 */


function processItem(item) {
  let child;
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
          dataSource: item.props.dataSource
        }
      }]
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
          "visible": `{{this.store.${item.props.name}}}`,
          "onOk": `{{(e) => this.onSubmit(e, [${item.children.map(item => "'" + item.props.name + "'")}])}}`,
          "onCancel": `{{() => this.store.${item.props.name} = false}}`
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
  jsonData.children.map(item => {
    const processed = processContainer(item)
    // Modal 和 Table 不放在form里
    if (processed.componentName.match('Modal|Table')) {
      schema.children.push(processed)
    } else {
      schema.children[0].children.push(processed)
    }
  })
  return {
    "componentName": "Page",
    "props": {},
    "children": [schema],
  }
}