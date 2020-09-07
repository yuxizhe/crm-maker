import { randomID } from './index'

export default function (ai, oldJson, aiType) {
  let jsonReturn = oldJson;
  let json = oldJson || {
    "componentName": "Page",
    "props": {},
    "children": []
  }
  if (aiType === 'modal') {
    const id = randomID();
    json = {
      "componentName": "Modal",
      "componentText": "弹窗",
      "props": {
        "key": id,
        "name": `Modal_${id}`
      },
      "children": [],
      "rules": []
    }
  }
  ai.map(item => {
    const random = randomID();
    let child = 
    {
      "componentName": item.predict,
      "componentType": "FormItem",
      "props": {
        "label": item.before_text,
        "defaultValue": '',
        "required": false,
        "placeholder": item.inner_text,
        "showLabel": true,
        "key": random,
        "name": `${item.predict}_${random}`
      },
      "rules": []
    }
    if (item.predict === 'Select') {
      child.props['dataSource'] = [
        {
          value: 'value1',
          label: '选项1'
        },
        {
          value: 'value2',
          label: '选项2'
        },
        {
          value: 'value3',
          label: '选项3'
        }
      ]
    }
    json.children.push(child)
    return ''
  })
  if (aiType === 'modal') {
    jsonReturn.children.push(json)
  } else {
    jsonReturn = json
  }
  return jsonReturn
}
