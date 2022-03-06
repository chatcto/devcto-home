import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { isWindow } from '@/utils/index';
import { withRouter } from 'next/router';
import Sidebar from '../Sidebar';
import { Header } from '@/components/Header';

function Layout({
  children,
  sideData,
  title = '开发之家',
  keywords = 'DEVCTO,开发者资讯,开发者文档,前端教程,reactjs教程,小程序教程',
  description = '提供Web前端、Python、go、java、等热门编程语言的体系化在线实战赋能和进阶教程，帮助用户实现职业提升、专业进阶和可持续成长。'
}) {
  const [navFixed, setNavFixed] = useState(false);

  useEffect(() => {
    if (isWindow()) {
      // eslint-disable-next-line consistent-return
      window.onscroll = () => {
        const { scrollY } = window;

        if (scrollY > 35) {
          setNavFixed(true);
        } else {
          setNavFixed(false);
        }
        return false;
      };
    }
  }, []);

  const renderChild = () => {
    return {
      ...children,
      props: {
        ...children.props,
        pageProps: {
          ...children.props.pageProps,
          navFixed
        }
      }
    };
  };

  console.log('sideData', sideData);
  return (
    <div className="wrapper">
      <Head>
        <title>{title} - 开发之家</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Header/>
      <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
    <div className="sm:w-1/5 md:1/4 w-full flex-shrink flex-grow-0 p-4">
    <Sidebar data={sideData} />
        <div className="bg-gray-50 rounded-xl border my-3 w-full">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    <span className="block text-indigo-600 overflow-ellipsis">Made with NEXTJS && Tailwind CSS!</span>
                </h2>
            </div>
        </div>
    </div>
    <main role="main" className="w-full h-full flex-grow p-3 overflow-auto">
        <h1 className="text-3xl md:text-5xl mb-4 font-extrabold" id="home">From Dev To CTO</h1>
        {children}
    </main>
</div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
export default withRouter(Layout);
