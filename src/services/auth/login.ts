import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { ILogin } from '../../types';

export const loginService = ({
  name,
  password,
  redirectUrl = process.env.SPIDERUM_REDIRECT_URL,
}: ILogin) => {
  const data = qs.stringify({
    name,
    password,
    redirectUrl,
  });

  const config: AxiosRequestConfig = {
    method: 'post',
    url: process.env.SPIDERUM_AUTH_API_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  };

  return axios(config);
};
