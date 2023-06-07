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
  const { method, body, headers } = req;

  console.log("### profile headers => ", headers);

  const result = await axios({
    url: "https://openapi.naver.com/v1/nid/me",
    method: "GET",
    headers: {
      Authorization: headers.authorization,
    },
  });

  console.log("### profile result => ", result);

  res.status(200).json(result.data);
}
