import { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

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
  const { method, body, query } = req;

  if (method === "POST") {
    console.log("### body => ", body);

    const channels = await client.channel.findMany({
      where: {
        channelId: { in: body.channelIds },
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

    console.log("### channels => ", channels);

    let result: IChannel[] = [];
    for (var channel of channels) {
      const data = Object.assign({}, channel);

      const user = await client.user.findFirst({
        where: {
          id:
            parseInt(session.activeChildId as string) === channel.createById
              ? channel.createFor.userId
              : channel.createBy.userId,
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

      Object.assign(data, { partner: user });
      result.push(data);
    }

    console.log("### result => ", result);

    res.json({ ok: true, channels: result });
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
});
