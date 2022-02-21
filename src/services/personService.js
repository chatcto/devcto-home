import request from '../utils/request';
import { baseUrl } from '../utils/config';

// 获取点赞列表
export const getPraiseList = payload =>
  request.post(`${baseUrl}/v1/service/user/praiseList`, payload);

// 获取点赞列表
export const getCollectList = payload =>
  request.post(`${baseUrl}/v1/service/user/collectList`, payload);
