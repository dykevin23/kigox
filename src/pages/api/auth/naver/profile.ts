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
    url: "https://openapi.naver.com/v1/nid/me",
    method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  res.status(200).json(data);
}
