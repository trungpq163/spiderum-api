import axios, { AxiosRequestConfig } from 'axios';
import { ISetPost } from '../../types';

export const unSavePostService = ({ post_id, token }: ISetPost) => {
  const data = JSON.stringify({ post_id });
  const config: AxiosRequestConfig = {
    method: 'post',
    url: `${process.env.SPIDERUM_API_V1_URL}/relation/user-post/unsave`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data,
  };

  return axios(config);
};
