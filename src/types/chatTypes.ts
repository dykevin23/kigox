import { IChild, IUser } from "./userTypes";

export interface IChannel {
  id: number;
  createById: number;
  createBy: IChild;
  createForId: number;
  createFor: IChild;
  channelId: string;
  partner?: IUser;
  lastMessage?: string;
  lastUpdatedAt?: string;
}

export interface IChat {
  id: string;
  userId: number;
  message: string;
  isRead: boolean;
  createAt: any;
}
