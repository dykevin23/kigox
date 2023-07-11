import withHandler, { ResponseType } from "common/utils/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "common/utils/server/client";

export interface JoinRequestBody {
  userId: number;
  nickname: string;
  birthday: string;
  //   gender: string;
  //   mobile: string;
  //   zonecode: number;
  //   address: string;
  //   detailAddress: string;
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
      gender: "MALE",
      mobile: "01099683613",
      zonecode: 123456,
      address: "서울시 강남구",
      detailAddress: "101동 101호",
      user: {
        connect: {
          id: body.userId,
        },
      },
    },
  });

  res.json({ ok: true });
}

export default withHandler({
  methods: ["POST"],
  handler,
});
