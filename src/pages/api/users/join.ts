import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";
import { AddressCoords } from "@components/common/PostCode";
import { IChild } from "types/userTypes";

export interface JoinRequestBody extends AddressCoords {
  userId: number;
  nickname: string;
  birthday: string;
  gender: string;
  zonecode: string;
  address: string;
  detailAddress: string;
  incomeRange: string;
  children: IChild[];
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  await client.profile.create({
    data: {
      nickname: body.nickname,
      birthday: body.birthday,
      gender: body.gender,
      mobile: "01099683613",
      zonecode: body.zonecode,
      address: body.address,
      detailAddress: body.detailAddress,
      longitude: parseFloat(body.longitude),
      latitude: parseFloat(body.latitude),
      incomeRange: body.incomeRange,
      user: {
        connect: {
          id: body.userId,
        },
      },
    },
  });

  if (body.children.length > 0) {
    for (var child of body.children) {
      await client.child.create({
        data: {
          nickname: child.nickname,
          birthday: child.birthday,
          gender: child.gender,
          user: {
            connect: {
              id: body.userId,
            },
          },
        },
      });
    }
  }

  res.json({ ok: true });
}

export default withHandler({
  methods: ["POST"],
  handler,
  isPrivate: false,
});
