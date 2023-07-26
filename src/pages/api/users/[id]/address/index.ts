import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";
import { AddressCoords } from "@components/common/PostCode";

export interface UserAddressRequestBody extends AddressCoords {
  profileId: number;
  zonecode: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { body } = req;

  const result = await client.profile.update({
    where: {
      id: body.profileId,
    },
    data: {
      zonecode: body.zonecode,
      longitude: parseFloat(body.longitude),
      latitude: parseFloat(body.latitude),
    },
  });

  res.json({ ok: true });
}

export default withHandler({
  methods: ["PUT"],
  handler,
});
