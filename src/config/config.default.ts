import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import path = require('path');
import { UserEntity } from '../entity/user.entity';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1656409332229_5313',
    egg: {
      port: 7001,
    },
    // security: {
    //   csrf: false,
    // },
    // jwt: {
    //   secret: 'jwtsecret', // fs.readFileSync('xxxxx.key')
    //   expiresIn: '2d', // https://github.com/vercel/ms
    // },
    orm: {
      type: 'sqlite',
      database: path.join(__dirname, '../../user.db'),
      dropSchema: true,
      entities: [UserEntity],
      synchronize: true,
      logging: false,
    },
  } as MidwayConfig;
};
