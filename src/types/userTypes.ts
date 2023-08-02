export interface IUser {
  [key: string]: any;
}

export interface IChild {
  id?: number;
  userId?: number;
  birthday: string;
  gender: string;
  createAt?: string;
  updateAt?: string;
}
