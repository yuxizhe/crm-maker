/**
 * 全局Store
 */
import { observable, action } from 'mobx';
class Store {
  @observable schema = 'schema'
}
export default {
  DSL: new Store()
}