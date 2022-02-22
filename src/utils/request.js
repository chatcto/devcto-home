import axios from 'axios';
import { baseUrl } from './config';
import { CODE_MESSAGE } from '@/consts/statusCode';
import { nodeAddToken } from './index';

axios.defaults.withCredentials = false;
axios.defaults.timeout = 50000;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = baseUrl;
axios.defaults.isCustomHeaders = true; // 是否拦截器重置请求头

// 中间件 拦截请求-
axios.interceptors.response.use(
  response => {
    if (response.isCustomHeaders) {
      // config.headers.Authorization = 'token';
    }
    return response;
  },
  err => {
    if (!err.response) return;

    const res = err.response;
    if (CODE_MESSAGE[res?.status]) {
      console.error(`${CODE_MESSAGE[res?.status]}`);
    }
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (!err.response) return;
    Promise.reject(err);
  }
);

axios.interceptors.request.use(
  config => {
    if (
      typeof window !== 'undefined' &&
      typeof window.navigator !== 'undefined'
    ) {
      const token = localStorage.getItem('access_token');

      if (token) {
        config.headers.Authorization = `bearer ${token}`;
        return config;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const safeRequest = (url, options) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      ...options,
      url
    }).then(
      res => {
        resolve(res?.data);
      },
      err => {
        reject(err);
      }
    );
  });
};

/**
 * get
 * @param url
 * @param opts
 * @returns {Promise}
 */
const get = (url, opts = {}) => {
  return safeRequest(url, opts);
};

/**
 * post
 * @param url
 * @param opts
 * @returns {Promise}
 */
const post = (url, opts = {}) => {
  return safeRequest(url, {
    data: { ...opts },

    method: 'POST'
  });
};

/**
 * put
 * @param url
 * @param opts
 * @returns {Promise}
 */
const put = (url, opts = {}) => {
  return safeRequest(url, {
    ...opts,
    method: 'PUT'
  });
};

// node服务端请求底层
const nodeAxios = (url, data = {}, ctx) => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'get', // default
      ...nodeAddToken(data, ctx)
    }).then(
      response => {
        resolve(response?.data);
      },
      error => {
        reject(error);
      }
    );
  }).catch(() => {});
};

// 服务端get请求
const nodeGet = (url, params, ctx) => {
  return nodeAxios(
    url,
    {
      method: 'get',
      params
    },
    ctx
  );
};

// 服务端post请求
const nodePost = (url, data, ctx) => {
  return nodeAxios(
    url,
    {
      method: 'post',
      data
    },
    ctx
  );
};

// 服务端put请求
const nodePut = (url, data, ctx) => {
  return nodeAxios(
    url,
    {
      method: 'put',
      data
    },
    ctx
  );
};

export default {
  get,
  post,
  put,
  nodeGet,
  nodePost,
  nodePut
};
