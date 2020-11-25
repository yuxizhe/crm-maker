/**
 * 全局Store
 */
import { observable, action, autorun } from 'mobx';
class Store {
  // 调试用
  constructor() {
    autorun(() => console.log(JSON.parse(JSON.stringify(this.schema))));
  }

  @observable.deep schema = {
    "componentName": "Page",
    "props": {},
    "children": [],
    "dataKeysNames": {
      keys: [],
      names: [],
    }
  }

  @observable selectItem = {}

  @observable selectItemParent = {}

  @observable selectItemIndex = '';

  // @observable.deep dataKeys = [];

  // @observable.deep dataNames = [];

  @observable pasteDate = '';

  @action
  initSchema() {
    this.schema = {
      "componentName": "Page",
      "props": {},
      "children": [],
      "dataKeysNames": {
        keys: [],
        names: [],
      }
    }
    this.selectItem = {}
  }
}
export default {
  DSL: new Store()
}