import { IChild, IUser } from "./userTypes";

export interface IChannelList {
  channelId: string;
  lastMessage: string;
  lastUpdatedAt: string;
  newChatCount: number;
  createById?: number;
  createBy?: IChild;
  createForId?: number;
  createFor?: IChild;
  partner?: IUser;
}

export interface IChannel {
  id: number;
  createById: number;
  createBy: IChild;
  createForId: number;
  createFor: IChild;
  channelId: string;
  partner?: IUser;
  // lastMessage?: string;
  // lastUpdatedAt?: string;
  // newChatCount?: number;
}

export interface IChat {
  id: string;
  userId: number;
  message: string;
  isRead: boolean;
  createAt: any;
}
