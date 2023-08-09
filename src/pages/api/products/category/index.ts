import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";
import { IMainCategory } from "types/metadataType";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<IMainCategory[]>>,
  session: any
) {
  const result = await client.mainCategory.findMany({
    select: {
      id: true,
      category: true,
      name: true,
      MiddleCategory: {
        select: {
          id: true,
          category: true,
          name: true,
          mainCategoryId: true
        },
      },
    },
  });

  res.json({ ok: true, result });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
