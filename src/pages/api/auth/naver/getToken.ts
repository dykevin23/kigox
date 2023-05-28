// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, body } = req;

  console.log("### success call api => ", body);

  // const result = await axios({
  //   url: "https://nid.naver.com/oauth2.0/token",
  //   method,
  //   data: body,
  // });

  // console.log("### result => ", result);

  res.status(200).json({ ...body });
}
