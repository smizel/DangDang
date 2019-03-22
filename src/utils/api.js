import { MethodType } from './promise';

const promise = require('./promise');


// // 上传文件
// export const uploadFile = async file => {
//   const form = new FormData();
//   form.append('file', file);
//   return await promise.request('/back_banner/up_img', MethodType.POST, form, {
//     'Content-Type': 'multipart/form-data',
//   });
// };
//
// // 轮播图管理
//
// export const _add_banner = async (token, timestamp, model, file, title, type, status) => {
//   return await promise.request('/back_banner/add', MethodType.POST, {
//     token,
//     timestamp,
//     model,
//     file,
//     title,
//     type,
//     status,
//   });
// };
//
// export const _delete_banner = async (token, timestamp, model, bid) => {
//   return await promise.request('/back_banner/delete', MethodType.GET, {
//     token,
//     timestamp,
//     model,
//     bid,
//   });
// };
//
// export const _change_banner = async (token, timestamp, model, bid, status) => {
//   return await promise.request('/back_banner/change', MethodType.GET, {
//     token,
//     timestamp,
//     model,
//     bid,
//     status,
//   });
// };
//
// export const _all_show_banner = async (token, timestamp, model, mobile, project) => {
//   return await promise.request('/back_banner/index', MethodType.GET, {
//     token,
//     timestamp,
//     model,
//     mobile,
//     project,
//   });
// };

// 预约管理
export const _all_show_order = async (token, timestamp, model, types, status, mobile, name) => {
  return await promise.request('/admin_reservation/index', MethodType.GET, {
    token,
    timestamp,
    model,
    types,
    status,
    mobile,
    name,
  });
};

export const _check_order = async (token, timestamp, model, id, status) => {
  return await promise.request('/admin_reservation/check', MethodType.GET, {
    token,
    timestamp,
    model,
    id,
    status,
  });
};
