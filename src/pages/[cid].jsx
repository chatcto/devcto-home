import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getContentList, getCatList } from '@/services/homeService'

import Layout from '@/components/Layout'

export default function Home ({
  userAgent,
  page,
  contentData,
  catData,
  cid,
  total
}) {
  const [list, setList] = useState(contentData.records || [])
  console.log('contentData', contentData.records)
  const [loading, setLoading] = useState(false)
  const [showMore, setShowMore] = useState(true)
  const [curpage, setCurpage] = useState(page)
  console.log('curpage',curpage);
  console.log('list',list);
  useEffect(() => {
    setList([...contentData.records])
  },[])

  const loadMore = () => {
    const res = getContentList({
      page: curpage + 1,
      cid: cid || activeMenuItem
    }).then((resx)=>{
      console.log(555,resx);
      // res
      console.log('xxxx',list)
      console.log('yyyy',resx.data.records)
      let obj = Object.assign(list,resx.data.records)
      console.log('zzz',obj);
      setCurpage(curpage + 1)
    })
  }

  // console.log('contentData', contentData);
  return (
    <div className={styles.container}>
      <Layout sideData={catData.navList}>
        <div className='homedata'>
          <div
            className={
              'columns-3xs  grid-cols-4 gap-4 font-mono  text-sm text-center font-bold leading-6 bg-stripes-fuchsia rounded-lg'
            }
          >
            {list &&
              list.map((item, index) => {
                return (
                  <div
                    className={'w-60 h-90 mt-6 rounded-lg shadow-lg'}
                    key={index}
                  >
                    <Image
                      src='https://cdn.devcto.com/a1f70c6818c37d6c316e074395f8987a.jpg'
                      alt='Picture of the author'
                      width={244}
                      height={160}
                    />
                    <a href={`/p/${item.uniqueId}`}>
                      <div className='p-3'>
                        <p className='leading-relaxed text-base break-words'>
                          {item.title}
                        </p>
                        <p className='leading-relaxed text-sm text-slate-600'>
                          {item.author}
                        </p>
                        <p className='leading-relaxed text-sm text-slate-600'>
                          {item.releaseTime}
                        </p>
                        <div className='p-3 h-30'>
                          <p className='leading-relaxed text-slate-400 break-words'>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                )
              })}
          </div>
        </div>
        <div className='moredata' onClick={loadMore}>
          <button className='w-full h-20 mt-20 ring-2 ring-blue-500'>
            加载更多
          </button>
        </div>
      </Layout>
    </div>
  )
}
export async function getServerSideProps (context) {
  const { cid } = context?.query
  const catRes = await getCatList()
  console.log('catRes', catRes?.data)
  const res = await getContentList({
    page: 1,
    cid: cid || catRes?.data?.navList?.[0]?.cid,
    // pageSize: 10
  })
  // console.log('res', res);
  return {
    props: {
      contentData: res?.data || {},
      catData: catRes?.data || {},
      cid: cid || catRes?.data?.navList?.[0]?.cid,
      total: res?.data?.total,
      page: 1
    }
  }
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
}
