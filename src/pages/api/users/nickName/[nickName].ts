import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@common/utils/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<any>>
) {
  const {
    query: { nickName },
  } = req;

  const user = await client.profile.findFirst({
    where: {
      nickname: nickName as string,
    },
  });

  console.log("### user => ", user);

  res.json({ ok: true, user });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
