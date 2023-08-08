import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@common/utils/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { body } = req;

  const userList = await client.profile.findMany({});

  res.json({ ok: true, userList });
}

export default withHandler({
  methods: ["GET"],
  handler,
  isPrivate: false,
});
