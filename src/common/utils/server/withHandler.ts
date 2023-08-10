import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "@pages/api/auth/[...nextauth]";

export interface ResponseType<T> {
  ok: boolean;
  [key: string]: any;
}

type method = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse, session: any) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  methods,
  isPrivate = true,
  handler,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }

    try {
      const session = await getServerSession(req, res, authOptions);
      if (isPrivate && !session) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      await handler(req, res, session);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
