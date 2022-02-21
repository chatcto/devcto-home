import request from '../utils/request';
import { baseUrl } from '../utils/config';

/**
 * 资讯详情
 * https://文档链接
 */
export const getDetail = async (payload, ctx) => {
  return request.nodePost(`${baseUrl}/v1/service/news/detail`, payload, ctx);
};
// 用户点赞
export const userPraise = async payload => {
  return request.post(`${baseUrl}/v1/service/user/praise`, payload);
};
// 用户收藏
export const userCollect = async payload => {
  return request.post(`${baseUrl}/v1/service/user/collect`, payload);
};
