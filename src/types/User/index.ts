import { ObjectId } from '../index';

export interface ICreatorId {
  _id?: ObjectId;
  avatar?: string;
  display_name?: string;
  gravatar?: string;
  name?: string;
}
