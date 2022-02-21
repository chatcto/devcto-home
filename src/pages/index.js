import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getContentList, getCatList } from '@/services/homeService';


export default function Home({ userAgent, contentData, catData, cid, total }) {

  console.log('contentData',contentData);
  return (
    <div className={styles.container}>
      <div className="grid grid-cols-4 gap-4 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-fuchsia rounded-lg">
        <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">01</div>
        <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">02</div>
        <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">03</div>
        <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">04</div>
        <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">05</div>
        <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">06</div>
        <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">07</div>
        <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">08</div>
        <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">09</div>
      </div>
    </div>
  )
}
export async function getServerSideProps(context){
  const { cid } = context?.query;
  const catRes = await getCatList();
  const res = await getContentList({
    page: 1,
    cid: cid || catRes?.data?.navList?.[0]?.cid,
    pageSize: 30
  });
  return {
    contentData: res?.data || {},
    catData: catRes?.data || {},
    cid: cid || catRes?.data?.navList?.[0]?.cid,
    total: res?.data?.total
  };
};