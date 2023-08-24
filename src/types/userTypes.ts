import { Provider } from "@common/constants/server";

export interface IUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  provider: Provider;
  craetedAt: string;
  updatedAt: string;
  Profile: IProfile[];
  [key: string]: any;
}

export interface IProfile {
  id: number;
  userId: number;
  nickname: string;
  [key: string]: any;
}

export interface IChild {
  id?: number;
  userId?: number;
  nickname: string;
  birthday: string;
  gender: string;
  createAt?: string;
  updateAt?: string;
}
