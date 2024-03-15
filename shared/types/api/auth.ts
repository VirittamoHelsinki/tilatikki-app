export interface IRegisterUserParams {
  firstname: string|undefined;
  lastname: string|undefined;
  email: string|undefined;
  password: string|undefined;
}

export interface ILoginUserParams {
  email: string;
  password: string;
}

export interface IAuthResponse {
  success: boolean;
  token?: string;
  data?: unknown;
  error?: unknown | Error | string;
}