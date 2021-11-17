import jwtDecode from 'jwt-decode';
import { IAuth } from '../types';

export const getUserInfo = (token: string): IAuth | null => {
  try {
    const decoded: IAuth = jwtDecode(token);
    return decoded;
  } catch (e) {
    return null;
  }
};
