import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";
import { IProduct } from "types/productTypes";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<IProduct[]>>,
  session: any
) {
  const {
    query: { id, excludeProductId },
  } = req;

  const childIds = await client.child.findMany({
    where: {
      userId: parseInt(id as string),
    },
    select: { id: true },
  });

  const products = await client.product.findMany({
    where: {
      childId: {
        in: childIds.map((item) => item.id),
      },
      id: {
        not: parseInt(excludeProductId as string),
      },
    },
    include: {
      _count: {
        select: {
          Fav: true,
        },
      },
      File: {
        select: {
          filePath: true,
        },
      },
    },
  });

  let list: IProduct[] = [];
  for (var product of products) {
    list.push({
      id: product.id,
      title: product.title,
      mainCategory: product.mainCategory,
      middleCategory: product.middleCategory,
      price: product.price,
      tradeMethod: product.tradeMethod,
      tradeRegion: product.tradeRegion,
      recommendAge: product.recommedAge,
      gender: product.gender,
      description: product.description,
      status: product.status,
      childId: product.childId,
      image: product?.File[0].filePath,
      favCount: product._count.Fav,
      updatedAt: new Date(product.updatedAt).toISOString(),
    });
  }

  res.json({ ok: true, products: list });
}

export default withHandler({
  methods: ["GET"],
  handler,
});