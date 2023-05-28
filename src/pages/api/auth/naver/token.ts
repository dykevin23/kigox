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

  const { data } = await axios({
    url: "https://nid.naver.com/oauth2.0/token",
    method: "GET",
    params: body,
  });

  res.status(200).json(data);
}
