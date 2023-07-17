import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@common/utils/server/client";
import { IChild } from "@components/common/Child";
import { AddressCoords } from "@components/common/PostCode";

export interface JoinRequestBody {
  userId: number;
  nickname: string;
  birthday: string;
  gender: string;
  zonecode: string;
  address: string;
  detailAddress: string;
  addressCoords: AddressCoords;
  incomeRange: string;
  children: IChild[];
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { body } = req;
  console.log("### body => ", body);

  await client.profile.create({
    data: {
      nickname: body.nickname,
      birthday: body.birthday,
      gender: body.gender,
      mobile: "01099683613",
      zonecode: body.zonecode,
      address: body.address,
      detailAddress: body.detailAddress,
      longitude: body.addressCoords.longitude,
      latitude: body.addressCoords.latitude,
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
          birthday: child.birthday,
          gender: child.birthday,
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
});
