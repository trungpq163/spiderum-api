import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

export interface ILoginService {
  name: string;
  password: string;
  redirectUrl?: string;
}

export const loginService = ({
  name,
  password,
  redirectUrl = process.env.SPIDERUM_REDIRECT_URL,
}: ILoginService) => {
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
