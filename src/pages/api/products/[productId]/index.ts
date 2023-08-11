import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<any>>,
  session: any
) {
  const {
    query: { productId },
  } = req;

  const product = await client.product.findFirst({
    where: {
      id: parseInt(productId as string),
    },
  });

  res.json({ ok: true, product });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
