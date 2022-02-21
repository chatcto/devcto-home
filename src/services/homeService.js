import request from '../utils/request';
import { baseUrl } from '../utils/config';

/**
 * 咨询列表
 * https://文档链接
 */
export const getContentList = async payload => {
  return request.post(`${baseUrl}/v1/service/news/list`, payload);
};

/**
 * 资讯类型
 * https://文档链接
 */
export const getCatList = async payload => {
  return request.post(`${baseUrl}/v1/service/news/navList`, payload);
};

export const getHomeData = async () => {
  const res = await request.get(
    `https://ali-cyb-cdn.kaikeba.com/kkb-plat/aboutData/aboutData.json`
  );
  return {
    code: 0,
    data: res.data
  };
};
