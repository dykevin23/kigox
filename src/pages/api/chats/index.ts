import { NextApiRequest, NextApiResponse } from "next";

import withHandler from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";

export interface CreateChannelRequestBody {
  channelId: string;
  createForId: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
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
    });

    res.json({ ok: true, chats });
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
