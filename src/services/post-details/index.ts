import axios, { AxiosRequestConfig } from 'axios';
import { IGetPostDetails } from '../../types';

export const getPostDetailsThroughRawHTMLService = ({
  slug,
}: IGetPostDetails) => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `${process.env.SPIDERUM_TARGET_URL}/bai-dang/${slug}`,
    headers: {},
  };

  return axios(config);
};
