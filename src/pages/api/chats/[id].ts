import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";
import { IChannel } from "types/chatTypes";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<IChannel>>,
  session: any
) {
  const {
    query: { id },
  } = req;
  const chat = await client.channel.findFirst({
    where: {
      channelId: id as string,
    },
  });

  res.json({ ok: true, chat: chat });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
