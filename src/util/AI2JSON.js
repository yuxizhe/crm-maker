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
  const sorted = JSON.parse(ai).sort((a, b) => a[0][0][1] - b[0][0][1])
  sorted.map(item => {
    const random = randomID();
    let child = 
    {
      "componentName": item[3],
      "componentType": "FormItem",
      "props": {
        "label": item[2],
        "defaultValue": '',
        "required": false,
        "placeholder": item[1],
        "showLabel": true,
        "key": random,
        "name": `${item[3]}_${random}`
      },
      "rules": []
    }
    if (item[3] === 'Select') {
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
  })
  if (aiType === 'modal') {
    jsonReturn.children.push(json)
  } else {
    jsonReturn = json
  }
  return jsonReturn
}
