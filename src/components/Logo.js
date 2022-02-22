import clsx from 'clsx'
import Imgae from "next/image"

// const curtTheme =  localStorage.theme
// https://s.shudong.wang/shudong-wang-logo-w.png
// console.log('localStorage.theme',curtTheme);
export function Logo({ className, ...props }) {
  return (
    <Imgae width={200} height={35} src='https://img.kaikeba.com/a/90841172501202nbao.png'/>
  )
}
