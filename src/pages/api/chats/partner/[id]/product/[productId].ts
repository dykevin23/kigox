import { NextApiRequest, NextApiResponse } from "next";

import withHandler from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session: any
) {
  const {
    query: { id, productId },
  } = req;

  const chat = await client.channel.findFirst({
    where: {
      productId: parseInt(productId as string),
      OR: [
        {
          createById: parseInt(session.activeChildId),
          createForId: parseInt(id as string),
        },
        {
          createById: parseInt(id as string),
          createForId: parseInt(session.activeChildId),
        },
      ],
    },
  });

  res.json({ ok: true, chat });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
