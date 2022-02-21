import request from '../utils/request';
import { baseUrl } from '../utils/config';

// 发送手机验证码
export const sendVerifyCode = payload =>
  request.post(`${baseUrl}/v1/sendCode`, payload);

// 手机验证码登录
export const phoneCodeLogin = payload =>
  request.post(`${baseUrl}/v1/loginByMobile`, payload);
// 获取第三方登录地址
export const getOAuthUrl = payload =>
  request.get(`${baseUrl}/v1/getOAuthUrl`, payload);

// 获取第三方登录信息
export const getOAuth = payload => request.post(`${baseUrl}/v1/oauth`, payload);

// 退出登录
export const logout = payload => request.post(`${baseUrl}/v1/logout`, payload);

// 获取微信登录二维码
export const getWechatQrcode = () =>
  request.get(`${baseUrl}/v1/wechat/getTempQrcode`);
// 微信登录
export const fetchWechatLogin = payload =>
  request.post(`${baseUrl}/v1/wechat/checkScanUser`, payload);
