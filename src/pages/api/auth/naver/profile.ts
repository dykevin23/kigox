// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { sendApi } from "common/utils/axiosInstances";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, body } = req;

  const { data } = await sendApi({
    url: "https://openapi.naver.com/v1/nid/me",
    method: "GET",
  });

  res.status(200).json(data);
}
