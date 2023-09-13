import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";
import { ISearchHistory } from "types/searchTypes";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<ISearchHistory[]>>,
  session: any
) {
  const { method, body } = req;

  if (method === "GET") {
    const history = await client.search.findMany({
      where: {
        childId: parseInt(session.activeChildId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json({ ok: true, history });
  }

  if (method === "POST") {
    const history = await client.search.findMany({
      where: {
        childId: parseInt(session.activeChildId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const insertHistory = async () => {
      await client.search.create({
        data: {
          keyword: body.keyword as string,
          child: {
            connect: {
              id: parseInt(session.activeChildId),
            },
          },
        },
      });
    };

    const isEqualHistory = history.find(
      (item) => item.keyword === body.keyword
    );
    if (isEqualHistory || history.length === 5) {
      const result = await client.search.delete({
        where: { id: isEqualHistory ? isEqualHistory.id : history[4].id },
      });

      if (result) insertHistory();
    } else {
      insertHistory();
    }

    res.json({ ok: true });
  }

  if (method === "DELETE") {
    await client.search.deleteMany({
      where: { childId: parseInt(session.activeChildId) },
    });

    res.json({ ok: true });
  }
}

export default withHandler({
  methods: ["GET", "POST", "DELETE"],
  handler,
});
