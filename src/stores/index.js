/**
 * 全局Store
 */
import { observable, autorun } from 'mobx';
class Store {
  // 调试用
  constructor() {
    autorun(() => console.log(JSON.parse(JSON.stringify(this.schema))));
  }

  @observable schema = {
    "componentName": "Page",
    "props": {},
    "children": []
  }
}
export default {
  DSL: new Store()
}