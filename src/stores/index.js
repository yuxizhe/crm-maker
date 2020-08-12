/**
 * 全局Store
 */
import { observable } from 'mobx';
class Store {
  // 调试用
  // constructor() {
  //   autorun(() => console.log(JSON.parse(JSON.stringify(this.schema))));
  // }

  @observable.deep schema = {
    "componentName": "Page",
    "props": {},
    "children": []
  }

  @observable selectItem = {}
}
export default {
  DSL: new Store()
}