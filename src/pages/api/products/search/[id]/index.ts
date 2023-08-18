import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";
import { ISearchHistory } from "types/searchTypes";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<ISearchHistory[]>>,
  session: any
) {
  const {
    query: { id },
  } = req;

  await client.search.delete({
    where: { id: parseInt(id as string) },
  });

  res.json({ ok: true });
}

export default withHandler({
  methods: ["DELETE"],
  handler,
});
