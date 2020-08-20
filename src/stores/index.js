/**
 * 全局Store
 */
import { observable, action } from 'mobx';
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

  @action
  initSchema() {
    this.schema = {
      "componentName": "Page",
      "props": {},
      "children": []
    }
  }
}
export default {
  DSL: new Store()
}