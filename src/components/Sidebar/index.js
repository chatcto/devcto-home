import Head from 'next/head'

export default function Sidebar({ data }) {
  console.log('data', data);
  if (!data) return null
  return <div>
    <div className="sticky top-0 p-4 bg-gray-100 rounded-xl w-full">
      <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
        {data && data.map((item, index) => {
          // return <div key={index}> {item.name} </div>
          return <li className="py-2 hover:bg-indigo-300 rounded" key={index}>
            <a className="truncate" href={'/'+item.slug}>
              <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/home.svg" className="w-7 sm:mx-2 mx-4 inline" />
              <span className="hidden sm:inline">{item.name}</span>
            </a>
          </li>
        })}
      </ul>
    </div>
  </div>
}