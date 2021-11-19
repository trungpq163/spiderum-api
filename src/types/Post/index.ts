import { ObjectId, ICreatorId, ITag, ICategory } from '../index';

export interface IPost {
  cat_id?: ICategory;
  child_comments?: ObjectId[];
  comment_count?: number;
  created_at?: string;
  creator_id?: ICreatorId;
  description?: string;
  hot_point?: number;
  new_title?: string;
  og_image_url?: string;
  point?: number;
  reading_time?: number;
  savedByUser?: boolean;
  slug?: string;
  star?: boolean;
  tags?: ITag[];
  thumbnail?: ObjectId;
  title?: string;
  type?: number;
  userAction?: number;
  views_count?: number;
  _id?: ObjectId;
}

export interface IPosts {
  isCustomiseFeed?: boolean;
  items?: IPost[];
  totalItems?: number;
}

export interface IPostsInFeed {
  hasViewedNewPost?: boolean;
  posts?: IPosts;
  tags?: ITag[];
}

export interface IGetPosts {
  type?: string;
  page?: number;
}

export interface ISetPost {
  post_id: ObjectId;
  action?: number;
  token: string;
}
