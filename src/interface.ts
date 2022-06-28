/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: string;
}

export interface IGetUserResponse {
  code?: number;
  success: boolean;
  message: string;
  data: any;
}
