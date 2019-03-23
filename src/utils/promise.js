import axios from 'axios';
import { Message } from 'antd';

export const MethodType = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

/**
 * 模块说明:有api_token的请求
 */
export const request = (api, method = MethodType.GET, params = {}, config = {}) => {
  const apiToken = 'B3eCSULldSw1fjtXz4DQ8XXViZxXknzJtwHzHt02KnxFkpXRcehWWD5X9Y8Q';
  const data = method === 'GET' ? 'params' : 'data';
  let headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiToken}`,
  };
  if (config.headers) {
    headers = {
      ...headers,
      ...config.headers,
    };
  }
  return new Promise((resolve, reject) => {
    axios({
      url: `/api${api}`,
      method,
      [data]: params,
      headers,
    })
      .then(resolve)
      .catch(error => {
        console.dir(error);
        Message.error(
          typeof error.response.data === 'string'
            ? error.response.data
            : JSON.stringify(error.response.data)
        );
        reject(error);
      });
  });
};

/**
 * 模块说明:无api_token请求
 */
export const requestLogin = (api, method = MethodType.GET, params = {}) => {
  const data = method === 'GET' ? 'params' : 'data';
  return axios({
    url: `/api${api}`,
    method,
    [data]: params,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resp => {
      if (resp.status >= 300) {
        console.error('网络错误', resp);
      }
      return resp;
    })
    .catch(error => {
      console.error('请求错误', error);
      return error;
    });
};
