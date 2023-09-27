import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";
import { IChannel } from "types/chatTypes";

export interface CreateChannelRequestBody {
  channelId: string;
  createForId: string;
  productId: number;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<IChannel[]>>,
  session: any
) {
  const { method, body } = req;

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
  methods: ["POST"],
  handler,
});
