import request from '../utils/request';
import { baseUrl } from '../utils/config';

// 获取个人信息
export const getUserInfoApi = payload =>
  request.get(`${baseUrl}/v1/me`, payload);
