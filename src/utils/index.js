/* eslint-disable */
export const checkServer = () => {
  return typeof window === 'undefined';
};

export const isPc = userAgent => {
  let client = 'PC';
  if (/(iPhone|iPad|iPod|iOS)/i.test(userAgent)) {
    client = 'iOS';
  } else if (/(Android)/i.test(userAgent)) {
    client = 'Android';
  }
  return client === 'PC';
};

/**
 * node层，获取判断是否pc端
 */
export const isPcNode = req => {
  const ua = req?.headers?.['user-agent'] || '';
  return isPc(ua);
};

/**
 * 动态插入js
 * @insert 标签script插入位置，head顶位置，为空插入在底部
 * @async 是否异步加载
 */
export const loadJs = ({ src, insert, async = true }) => {
  return new Promise((res, rej) => {
    const elementJs = document.createElement('script');
    elementJs.src = src;
    elementJs.type = 'text/javascript';
    elementJs.async = async;
    elementJs.onload = () => res({ code: 0 });
    elementJs.onerror = err => rej({ code: 1, err });

    if (insert === 'head') {
      document.head.appendChild(elementJs);
    } else {
      document.body.appendChild(elementJs);
    }
  });
};

/**
 * 通用时间格式转换，将时间戳转换自己需要的格式
 *
 * [fmt] 第二参数类型字符串，注意指定
 * 年(y)、月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) ，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *
 * customFormatDate(时间戳, "yyyy-MM-dd hh:mm:ss.S") 转换后 2016-07-02 08:09:04.423
 */
export const customFormatDate = (UnixTime, fmt) => {
  if (!UnixTime) return '';
  const dateTime = new Date(parseInt(UnixTime * 1000));
  const o = {
    'M+': dateTime.getMonth() + 1, // 月份
    'd+': dateTime.getDate(), // 日
    'h+': dateTime.getHours(), // 小时
    'm+': dateTime.getMinutes(), // 分
    's+': dateTime.getSeconds(), // 秒
    'q+': Math.floor((dateTime.getMonth() + 3) / 3), // 季度
    S: dateTime.getMilliseconds() // 毫秒
  };
  let newDataStrin = fmt || 'yyyy-MM-dd hh:mm:ss.S';
  if (/(y+)/.test(newDataStrin)) {
    newDataStrin = newDataStrin.replace(
      RegExp.$1,
      `${dateTime.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(newDataStrin)) {
      newDataStrin = newDataStrin.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  }
  return newDataStrin;
};

/**
 * 设置storage值
 */
export const setStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

/**
 * 获取指定storage值
 */
export const getStorage = key => {
  if (!key || key !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

/**
 * 移除指定storage内的值
 */
export function removeStorage(key) {
  return localStorage.removeItem(key);
}

/**
 * 获取url参数数据，返回obj对象
 */
export const getUrlToJson = url => {
  try {
    const strUrl = url || window?.location?.href || '';
    const temp1 = strUrl.split('?');
    const pram = temp1[1];
    if (pram === 'undefined' || !pram) {
      return {};
    }
    const keyValue = pram.split('&');
    const obj = {};
    for (let i = 0; i < keyValue.length; i++) {
      const item = keyValue[i].split('=');
      const key = item[0];
      const value = item[1];
      obj[key] = value;
    }
    return obj;
  } catch (error) {
    return {};
  }
};

export const delUrlParams = (url, name) => {
  // 根据#号拆分
  const poundArr = url.split('#');
  // ？拆分
  let questionArr = [];
  if (poundArr) {
    // 把#接上
    poundArr.forEach((element, index) => {
      if (index > 0) {
        element = `#${element}`;
      }
      const tempArr = element.split('?');
      if (!tempArr) {
        return true;
      }
      tempArr.forEach((item, idx) => {
        // 保留问号
        if (idx > 0) {
          item = `?${item}`;
        }
        questionArr.push(item);
      });
    });
  } else {
    questionArr = url.split('?');
    if (questionArr) {
      questionArr.forEach((item, idx) => {
        if (idx > 0) {
          item = `?${item}`;
        }
      });
    }
  }

  if (!questionArr) {
    return url;
  }

  // &符号的处理
  const andArr = [];
  questionArr.forEach((item, index) => {
    const andIdx = item.indexOf('&');
    if (andIdx <= -1) {
      andArr.push(item);
      return true;
    }

    const tempAndArr = item.split('&');
    tempAndArr.forEach((ele, idx) => {
      if (idx > 0) {
        ele = `&${ele}`;
      }
      andArr.push(ele);
    });
  });

  let newUrl = '';
  andArr.forEach(item => {
    const nameIndex = item.indexOf(`${name}=`);
    // 不拼接要删除的参数
    if (nameIndex > -1) {
      // 保留第一个问号
      const questionIdx = item.indexOf('?');
      if (questionIdx == 0) {
        newUrl += '?';
      }
      return true;
    }
    newUrl += item;
  });

  return newUrl.replace(/\?\&/g, '?');
};

// pc端七牛缩略图，指定宽
export const getPcThumbImg = ({ url, width, height }) => {
  let newUrl = `${url}?imageView2/2/w/${width || 200}`;
  if (height) {
    newUrl += `/h/${height}`;
  }
  return newUrl;
};

// 移动端七牛缩略图，指定宽
export const getMobileThumbImg = ({ url, width, height }) => {
  let newUrl = `${url}?imageView2/0/w/${width || 200}`;
  if (height) {
    newUrl += `/h/${height}`;
  }
  return newUrl;
};

// 判断window对象是否存在
export const isWindow = () => {
  if (
    typeof window !== 'undefined' &&
    typeof window.navigator !== 'undefined'
  ) {
    return true;
  }
  return false;
};

export const getUserInfo = () => {
  if (isWindow()) {
    const userInfo = window.localStorage.getItem('userInfo');

    if (userInfo) {
      return JSON.parse(atobCompatible(userInfo));
    }
    return false;
  }
  return false;
};

// btoa 兼容写法
export const btoaCompatible = str => {
  if (isWindow()) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }
};

// atob 兼容写法
export const atobCompatible = str => {
  if (isWindow()) {
    return decodeURIComponent(escape(window.atob(str)));
  }
};

// 跳转外部链接
export const routerOutLink = url => {
  if (isWindow()) {
    window.location.href = `/link?url=${encodeURIComponent(url)}`;
  }
};

/**
 * Cookie操作
 * @get 取值
 * @set 存值
 *  */
export const Cookie = {
  get(keys, cookie) {
    let mat = new RegExp(`(^|[^a-z])${keys}=(.*?)(;|$)`, 'i').exec(
      cookie || document.cookie
    );
    return mat ? decodeURIComponent(mat[2]) : '';
  },

  set(name, value, expires, path, domain, secure) {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (expires instanceof Date) {
      cookieText += `; expires=${expires.toGMTString()}`;
    }

    if (path) {
      cookieText += `; path=${path}`;
    }

    if (domain) {
      cookieText += `; domain=${domain}`;
    }

    if (secure) {
      cookieText += '; secure';
    }

    document.cookie = cookieText;
  },

  unset(name, path, domain, secure) {
    this.set(name, '', new Date(0), path, domain, secure);
  },

  delete(name, path, domain) {
    this.set(name, '', -1, path, domain);
  }
};

/**
 * node端获取cookie
 */
export const nodeCookies = {
  getItem: function (cookie, sKey) {
    return (
      decodeURIComponent(
        cookie?.replace(
          new RegExp(
            '(?:(?:^|.*;)\\s*' +
              encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') +
              '\\s*\\=\\s*([^;]*).*$)|^.*$'
          ),
          '$1'
        )
      ) || null
    );
  }
};

export const nodeAddToken = (data, req) => {
  const accessToken = nodeCookies.getItem(req?.headers?.cookie, 'access_token');
  let config = {
    ...data,
    withCredentials: false
  };

  if (accessToken) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = accessToken ? `bearer ${accessToken}` : '';
  }
  // axios.defaults.withCredentials = false;
  // console.log('node端请求头参数', config);
  return config;
};
