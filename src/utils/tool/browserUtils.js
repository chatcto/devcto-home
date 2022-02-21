/**
 * 判断用户浏览器终端信息
 * browser(navigator.userAgent).ios 判断是否是IOS设备
 */
export const userBrowser = userAgent => {
  const u = userAgent || '';
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
    qq: u.match(/\sQQ/i) === 'qq', // 是否QQ
    app: u.indexOf('kkbMobile') > -1 // kkb-app
  };
};

// 判断是否是移动端
export const isMobile = () => {
  const ua = navigator.userAgent.toLowerCase();
  const isM =
    ua.match(
      /(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i
    ) != null;

  return isM;
};

export const isPc = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (
    /AppleWebKit.*Mobile/i.test(ua) ||
    /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(
      ua
    )
  ) {
    return !/Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(ua);
  }
  return true;
};

// 验证手机号
export const verPhone = phone => {
  let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  return myreg.test(phone);
};
