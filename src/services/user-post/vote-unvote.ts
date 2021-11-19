import axios, { AxiosRequestConfig } from 'axios';
import { ISetPost } from '../../types';

export const voteAndUnVotePostService = ({
  post_id,
  action,
  token,
}: ISetPost) => {
  const data = JSON.stringify({ post_id, action });
  const config: AxiosRequestConfig = {
    method: 'post',
    url: `${process.env.SPIDERUM_API_V1_URL}/relation/user-post/vote`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data,
  };

  return axios(config);
};
