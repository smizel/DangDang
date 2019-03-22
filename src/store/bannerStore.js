import { observable, action, toJS } from 'mobx';
import { _add_banner, _all_show_banner, _change_banner, _delete_banner } from '../utils/api';
import { message } from 'antd';

class bannerStore {
  // token
  @observable token = localStorage.getItem('token');

  // 上架
  @observable show = [];
  // 未上架
  @observable inshow = [];

  // 轮播图id
  @observable bid = '';
  // 上架状态
  @observable status = '';

  @observable image = '';

  @observable title = '';

  @observable alt = '';

  @observable isshow = '';

  @action.bound
  async load() {
    const timestamp = Date.parse(new Date()) / 1000;
    const resp = await _all_show_banner(this.token, timestamp, '3');

    console.log(resp);

    if (resp.data.status === 1) {
      const data = resp.data.data;

      const show = [];
      const inshow = [];
      for (let i = 0; i < data.length; i++) {
        // 上架
        if (data[i].status === 1) {
          show.push({
            id: data[i].id,
            title: data[i].title,
            description: data[i].type,
            href: data[i].img_url,
          });
          this.show = show;
        } //未上架
        else if (data[i].status === 0) {
          inshow.push({
            id: data[i].id,
            title: data[i].title,
            description: data[i].type,
            href: data[i].img_url,
          });
          this.inshow = inshow;
        }
      }
    } else {
      message.error(resp.data.msg);
    }
  }

  @action.bound
  async add_banner() {
    const timestamp = Date.parse(new Date()) / 1000;
    const resp = await _add_banner(
      this.token,
      timestamp,
      '3',
      this.image,
      this.title,
      this.alt,
      this.isshow
    );

    console.log(resp);
    if (resp.data.status === 1) {
      return this.load();
    } else {
      message.error(resp.data.msg);
    }
  }

  @action.bound
  async delete_banner() {
    const timestamp = Date.parse(new Date()) / 1000;
    const resp = await _delete_banner(this.token, timestamp, '3', this.bid);

    console.log(resp);
    if (resp.data.status === 1) {
      return this.load();
    } else {
      message.error(resp.data.msg);
    }
  }

  @action.bound
  async change_banner() {
    const timestamp = Date.parse(new Date()) / 1000;
    const resp = await _change_banner(this.token, timestamp, '3', this.bid, this.status);

    console.log(resp);
    if (resp.data.status === 1) {
      return this.load();
    } else {
      message.error(resp.data.msg);
    }
  }
}

export default (bannerStore = new bannerStore());
