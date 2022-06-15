import { RequestMethod } from '@nestjs/common';

import { registerAs } from '@nestjs/config';

export type ApiType = {
  routes: { path: string; method: RequestMethod };
  auth?: boolean;
  // creditCheck: false,
  // rateLimit: {
  //   windowMs: 15 * 60 * 1000,
  //   max: 5,
  // },
  proxy: {
    target: string;
    //   changeOrigin: true,
    pathRewrite?: {
      [key: string]: string;
    };
  };
};

const MICROSERVICES_CONFIG = [
  {
    routes: { path: '/free', method: RequestMethod.ALL },
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: 'https://www.google.com',
      //   changeOrigin: true,
      pathRewrite: {
        [`^/free`]: '',
      },
    },
  },
];

export const API_ENV = 'api';

export const apiEnv = registerAs(
  API_ENV,
  (): ApiType[] => MICROSERVICES_CONFIG,
);
