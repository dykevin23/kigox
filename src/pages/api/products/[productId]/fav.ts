import { NextApiRequest, NextApiResponse } from "next";

import withHandler from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session: any
) {
  const {
    query: { productId },
  } = req;

  const product = await client.fav.findFirst({
    where: {
      productId: parseInt(productId as string),
      childId: parseInt(session.activeChildId),
    },
  });

  if (product) {
    await client.fav.delete({
      where: {
        id: product.id,
      },
    });
  } else {
    await client.fav.create({
      data: {
        productId: parseInt(productId as string),
        childId: parseInt(session.activeChildId),
      },
    });
  }

  res.json({ ok: true });
}

export default withHandler({
  methods: ["POST"],
  handler,
});
