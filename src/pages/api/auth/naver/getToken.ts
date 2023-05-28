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

  const result = await axios({
    url: "https://nid.naver.com/oauth2.0/token",
    method: "POST",
    data: {
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_AUTH_NAVER_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_AUTH_NAVER_CLIENT_SECRET,
    },
  });

  console.log("### result => ", result);

  res.status(200).json({ ...body });
}
