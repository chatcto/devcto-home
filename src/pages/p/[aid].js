import React from 'react';
import { getCatList } from '../../services/homeService';
import { getDetail } from '../../services/detailService';
import { Header } from '@/components/Header';
import Layout from '@/components/Layout';
// 首页
const Post = ({ userAgent, contentDetail, catData }) => {
  console.log('contentDetail', contentDetail);
  return (
    <Layout sideData={catData.navList }>
      <div className='whitespace-normal'>
        <div>
          <p className="leading-relaxed text-lg break-words">{contentDetail.title}</p>
          <p className="leading-relaxed text-slate-400 break-words">{contentDetail.desc}</p>
          <a href={contentDetail.detailUrl}>查看全文</a>
        </div>
        <div>
          免责声明：本站所提供的内容均来源于网友提供或网络搜集，由本站编辑整理，仅供个人研究、交流学习使用。如涉及版权问题，请联系本站管理员予以更改或删除。
        </div>
      </div>
    </Layout>
  );
};

// Post.getInitialProps = async context => {
//   const { aid } = context?.query;

//   const catRes = await getCatList();
//   const res = await getDetail({ uniqueId: aid }, context?.req);
//   return { contentDetail: res?.data, catData: catRes?.data };
// };
export default Post;


export async function getServerSideProps(context) {
  const { aid } = context?.query;

  const catRes = await getCatList();
  const res = await getDetail({ uniqueId: aid }, context?.req);
  // return { contentDetail: res?.data, catData: catRes?.data };
  return {
    props: {
      contentDetail: res?.data || {},
      catData: catRes?.data || {}
    }
  }
}