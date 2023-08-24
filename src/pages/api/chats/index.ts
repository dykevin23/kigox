import { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";
import { db } from "../../../firebase";
import { IChannel } from "types/chatTypes";

export interface CreateChannelRequestBody {
  channelId: string;
  createForId: string;
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
      const q = query(chatRef, orderBy("createAt", "desc"), limit(1));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        Object.assign(newChat, {
          lastUpdatedAt: data.createAt.toDate(),
          lastMessage: data.message,
        });
      });

      const user = await client.user.findFirst({
        where: {
          id:
            session.activeChildId === chat.createById
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
      },
    });
    res.json({ ok: true });
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
});
