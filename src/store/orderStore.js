import { action, computed, observable, toJS, runInAction } from 'mobx';
import { _all_show_order, _check_order } from '../utils/api';
import { message } from 'antd';

class orderStore {

  @action.bound
 async order(){
   const resp = await _all_show_order()
    console.log(resp)
  }
}

export default (orderStore = new orderStore());
