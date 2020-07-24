
export const randomID = () => {
  return Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);
}

export const addItem = (evt, func, dragStore, editList) => {
  const newIndex = evt.newIndex
  //为拖拽到容器的元素添加唯一 key
  const key = randomID();
  const list = dragStore.dragging.props.list;
  // 简单深拷贝一下，防止污染元组件
  const component = JSON.parse(JSON.stringify(list[evt.oldIndex]))

  component.props.key = key
  component.props.name = component.componentName + '_' + key
  
  editList[newIndex] = component

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
