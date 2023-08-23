export interface IChannel {
  id: number;
  createById: number;
  createForId: number;
  channelId: string;
}

export interface IChat {
  id: string;
  userId: number;
  message: string;
  isRead: boolean;
  createAt: any;
}
