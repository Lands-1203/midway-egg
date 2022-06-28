/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: string;
}

export interface IGetUserResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
