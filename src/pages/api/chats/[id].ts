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
    select: {
      id: true,
      channelId: true,
      createById: true,
      createForId: true,
      createBy: true,
      createFor: true,
    },
  });

  const user = await client.user.findFirst({
    where: {
      id:
        parseInt(session.activeChildId as string) === chat?.createById
          ? chat?.createFor.userId
          : chat?.createBy.userId,
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

  res.json({ ok: true, chat: { ...chat, partner: user } });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
