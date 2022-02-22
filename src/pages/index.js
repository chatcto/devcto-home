import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getContentList, getCatList } from '@/services/homeService';
import { Header } from '@/components/Header';


export default function Home({ userAgent, contentData, catData, cid, total }) {

  console.log('contentData', contentData);
  return (
    <div className={'container', styles.container}>
      <Header />
      <div className={"gap-4 columns-2xs font-mono  text-center"}>
        {
          contentData && contentData.records.map((item, index) => {
            return <div className={"w-60 h-90 mt-6 rounded-lg shadow-lg"} key={index}>
              <Image
                src="https://cdn.devcto.com/a1f70c6818c37d6c316e074395f8987a.jpg"
                alt="Picture of the author"
                width={244}
                height={160}
              />
              <a href={`/p/${item.uniqueId}`}>
                <div className='p-3'>
                  <p className="leading-relaxed text-base break-words">{item.title}</p>
                  <p className="leading-relaxed text-sm text-slate-600">{item.author}</p>
                  <p className="leading-relaxed text-sm text-slate-600">{item.releaseTime}</p>
                  <div className='p-3 h-60'>
                    <p className="leading-relaxed text-slate-400 break-words truncate">{item.desc}</p>
                  </div>
                </div>
              </a>
            </div>
          })
        }
      </div>
    </div>
  )
}
export async function getServerSideProps(context) {
  const { cid } = context?.query;
  const catRes = await getCatList();
  const res = await getContentList({
    page: 1,
    cid: cid || catRes?.data?.navList?.[0]?.cid,
    pageSize: 30
  });
  console.log('res', res);
  return {
    props: {
      contentData: res?.data || {},
      catData: catRes?.data || {},
      cid: cid || catRes?.data?.navList?.[0]?.cid,
      total: res?.data?.total
    }
  };
  // const res = await getContentList({
  //   page: 1,
  //   cid: cid || catRes?.data?.navList?.[0]?.cid,
  //   pageSize: 30
  // });
  // return {
  //   props: {
  //     contentData: res?.data || {},
  //     catData: catRes?.data || {},
  //     cid: cid || catRes?.data?.navList?.[0]?.cid,
  //     total: res?.data?.total
  //   }
  // };
};