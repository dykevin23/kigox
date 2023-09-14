import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";
import { IUser } from "types/userTypes";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<IUser>>,
  session: any
) {
  const {
    query: { id },
  } = req;

  const user = await client.user.findFirst({
    where: {
      Child: {
        some: {
          id: parseInt(id as string),
        },
      },
    },
    include: {
      Profile: true,
    },
  });

  res.json({ ok: true, user });
}

export default withHandler({
  methods: ["GET"],
  handler,
  isPrivate: false,
});
