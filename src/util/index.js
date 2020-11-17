import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

export const randomID = () => {
  return Math.ceil(Math.random() * 99999);
}

export const addItem = (evt, func, dragStore, editList, DSL, parentItem) => {
  const newIndex = evt.newIndex
  //为拖拽到容器的元素添加唯一 key
  const key = randomID();
  const list = dragStore.dragging.props.list;
  // 简单深拷贝一下，防止污染元组件
  const component = JSON.parse(JSON.stringify(list[evt.oldIndex]))

  component.props.key = key
  component.props.name = component.componentName + '_' + key

  // 判断是不是formItem
  if (parentItem && parentItem.componentName && parentItem.componentName === 'Modal') {
    component.componentType = 'FormItem';
  }
  
  editList.splice(newIndex, 0, component)

  // 状态保存在store
  DSL.selectItem = editList[newIndex]
  DSL.selectItemIndex = newIndex
  DSL.selectItemParent = editList
  // console.log(JSON.parse(JSON.stringify(editList)))
}

export const moveItem = (moveEvt, evt, func, dragStore, editList) => {
  // oldIndex  newIndex  没有这两个属性。。
  const oldItem = JSON.parse(JSON.stringify(editList[evt.oldIndex]))
  const newItem = JSON.parse(JSON.stringify(editList[evt.newIndex]))
  
  editList[evt.newIndex] = oldItem
  editList[evt.oldIndex] = newItem

  console.log(JSON.parse(JSON.stringify(editList)))
}

export const prettierCode = (code, parser) => {
  try {
    return prettier.format(code, {
      parser,
      printWidth: 120,
      singleQuote: true,
      plugins: [parserBabel]
    })
  } catch (error) {
    console.error(error)
    debugger
    return code
  }
}

export const forceDownload = (url, fileName = 'example.png') => {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function(){
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = fileName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
  }
  xhr.send();
}