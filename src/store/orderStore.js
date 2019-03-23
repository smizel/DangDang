import { action, computed, observable, toJS, runInAction } from 'mobx';
import { _all_show_order, _check_order } from '../utils/api';
import { message } from 'antd';

class orderStore {

  //审核
  @observable orderList = [];

  //未审核
  @observable waitList = [];

  @observable id = '';

  @action.bound
 async order(){
   const resp = await _all_show_order();

    const show = resp.data.data;

    const orderList = [];
    const waitList = [];

    show.map((item,index)=>{
      if(item.status === "1" ){
        const obj = {};
        obj.key = index;
        obj.id = item.id;
        obj.name = item.name;
        obj.phone = item.phone;
        obj.comment  = item.comment;
        obj.tag = ['通过','green']
        orderList.push(obj)
      }

      this.orderList = orderList;


      if (item.status === "0" ) {
        const obj = {};
        obj.key = index;
        obj.id = item.id;
        obj.name = item.name;
        obj.phone = item.phone;
        obj.comment  = item.comment;
        obj.tag = ['未审核','red'];
        waitList.push(obj)
      }
      this.waitList = waitList;

    })
  }
}

export default (orderStore = new orderStore());
