export interface ILogin {
  name?: string;
  password?: string;
  redirectUrl?: string;
}

export interface IAuth {
  id?: string;
  status?: number;
  name?: string;
  display_name?: string;
  email?: string;
  gravatar?: string;
  iat?: number;
  exp?: number;
}
