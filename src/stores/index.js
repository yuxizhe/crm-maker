/**
 * 全局Store
 */
import { observable } from 'mobx';
class Store {
  @observable schema = {
    "componentName": "Page",
    "props": {},
    "children": []
  }
}
export default {
  DSL: new Store()
}