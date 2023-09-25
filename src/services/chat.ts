import { callApi } from "@common/utils/client/axiosInstances";
import { ResponseType } from "@common/utils/server/withHandler";
import { CreateChannelRequestBody } from "@pages/api/chats";
import { IChannel } from "types/chatTypes";

export const chats = async () => {
  const { chats } = await callApi<ResponseType<IChannel[]>>({
    url: "/api/chats",
    method: "GET",
  });

  return chats;
};

export const createChannel = async (data: CreateChannelRequestBody) => {
  return await callApi({
    url: "/api/chats",
    method: "POST",
    data,
  });
};

export const selectChannel = async (id: string, productId: number) => {
  const { chat } = await callApi<ResponseType<IChannel>>({
    url: `/api/chats/partner/${id}/product/${productId}`,
    method: "GET",
  });

  return chat;
};

export const channel = async (id: string) => {
  const { chat } = await callApi<ResponseType<IChannel>>({
    url: `/api/chats/${id}`,
    method: "GET",
  });

  return chat;
};
