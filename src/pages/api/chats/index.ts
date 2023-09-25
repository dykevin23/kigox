import { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";
import { db } from "../../../firebase";
import { IChannel } from "types/chatTypes";

export interface CreateChannelRequestBody {
  channelId: string;
  createForId: string;
  productId: number;
}

interface IChatInfo {
  index: number;
  userId: number;
  isRead: boolean;
  createAt: string;
  message: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<IChannel[]>>,
  session: any
) {
  const { method, body } = req;

  if (method === "GET") {
    const chats = await client.channel.findMany({
      where: {
        OR: [
          { createById: parseInt(session.activeChildId) },
          { createForId: parseInt(session.activeChildId) },
        ],
      },
      select: {
        id: true,
        channelId: true,
        createById: true,
        createForId: true,
        createBy: true,
        createFor: true,
      },
    });

    let result: IChannel[] = [];
    for (var chat of chats) {
      const newChat = Object.assign({}, chat);

      const chatRef = collection(db, `channel/${chat.channelId}/chat`);
      const q = query(chatRef, orderBy("createAt", "asc"));

      const querySnapshot = await getDocs(q);
      let chats: IChatInfo[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        chats.push({
          index: chats.length + 1,
          userId: data.userId,
          createAt: data.createAt.toDate(),
          message: data.message,
          isRead: data.isRead,
        });
      });

      if (chats.length > 0) {
        Object.assign(newChat, {
          lastMessage: chats[chats.length - 1].message,
          lastUpdatedAt: chats[chats.length - 1].createAt,
          newChatCount: chats.filter(
            (item) =>
              item.userId !== parseInt(session.activeChildId as string) &&
              !item.isRead
          ).length,
        });
      }

      const user = await client.user.findFirst({
        where: {
          id:
            parseInt(session.activeChildId as string) === chat.createById
              ? chat.createFor.userId
              : chat.createBy.userId,
        },
        include: {
          Profile: {
            select: {
              id: true,
              nickname: true,
            },
          },
        },
      });

      Object.assign(newChat, { partner: user });
      result.push(newChat);
    }

    res.json({ ok: true, chats: result });
  }

  if (method === "POST") {
    await client.channel.create({
      data: {
        channelId: body.channelId,
        createById: parseInt(session.activeChildId),
        createForId: parseInt(body.createForId),
        productId: parseInt(body.productId),
      },

    });
    res.json({ ok: true });
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
});
