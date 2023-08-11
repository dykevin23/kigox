import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<any>>,
  session: any
) {
  const products = await client.product.findMany({
    where: {
      childId: session.activeChildId,
    },
  });

  res.json({ ok: true, products });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
