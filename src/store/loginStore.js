import { action, computed, observable, toJS, runInAction } from 'mobx';
import { _adminLogin } from '../utils/api';
import { message } from 'antd';
import router from 'umi/router';

class loginStore {
  // 管理员登陆
  @action.bound
  async adminLogin(value) {
    const resp = await _adminLogin(value.userName, value.password);
    console.log(resp);
    if (resp.data.code === 11101) {
      const { token } = resp.data.data;
      localStorage.setItem('antd-pro-authority', '["admin"]');
      localStorage.setItem('authority', '1');
      localStorage.setItem('token', token);
      message.success('登录成功！');
      window.location.assign('/hospital/');
    } else {
      message.error('用户名或密码错误！');
    }
  }
}

export default (loginStore = new loginStore());
