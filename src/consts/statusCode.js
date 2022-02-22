export const HTTP_STATUS = {
  SUCCESS: 200,
  NOT_MODIFIED: 304,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
};

export const COMMON_STATUS = {
  CLIENT_ERROR: -40000,
  NOT_FOUND: -40400, // "请求资源不存在",
  API_NOT_FOUND: -40401, // "请求方法不存在",
  EXCEPTION: -50000, // "系统异常",
  PARAM_ERROR: -40001, // "参数错误",
  AUTH_FAILED: -40100, // "认证错误",
  NO_PERMISION: -40302, // "没有权限",
  NET_REQUEST_FAILED: -18939904, // "网络请求失败"
  JWT_FAILED: 10004 // "认证授权失败",
};

export const CODE_MESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '400接口请求失败，请重试！如有疑问，联系管理员。。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '抱歉！你暂无权限操作此功能。',
  404: '404接口请求失败，请重试！如有疑问，联系管理员。。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};
