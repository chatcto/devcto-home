console.log('process.env.INIT_ENV: ', process.env.INIT_ENV);
export const currentEnv = process.env.INIT_ENV;
const isProd = process.env.INIT_ENV === 'prod';
const ctext = currentEnv !== 'prod' ? `DEVCTO ${currentEnv}` : 'DEVCTO';

const defualtUrl = 'https://api.shudong.wang/v1';
console.info(
  `\n %c ${ctext} %c https://devcto.com \n`,
  'color: #fff; background: #03a8e8; padding:5px 0; font-size:12px;font-weight: bold;',
  'background: #03a8e8; padding:5px 0; font-size:12px;'
);

const urlEnv = {
  prod: 'https://api.devcto.com',
  dev: 'https://testapi.devcto.com',
  test: 'https://testapi.devcto.com'
};

export const baseUrl = urlEnv[currentEnv] || defualtUrl;
