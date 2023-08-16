import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";
import { IProduct } from "types/productTypes";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<IProduct>>,
  session: any
) {
  const {
    query: { productId },
    body,
    method,
  } = req;

  if (method === "GET") {
    const product = await client.product.findFirst({
      where: {
        id: parseInt(productId as string),
      },
      include: {
        File: {
          select: {
            filePath: true,
          },
        },
      },
    });

    res.json({
      ok: true,
      product: {
        id: product?.id,
        title: product?.title,
        mainCategory: product?.mainCategory,
        middleCategory: product?.middleCategory,
        price: product?.price,
        tradeMethod: product?.tradeMethod,
        tradeRegion: product?.tradeRegion,
        recommendAge: product?.recommedAge,
        gender: product?.gender,
        description: product?.description,
        status: product?.status,
        childId: product?.childId,
        image: product?.File[0].filePath,
      },
    });
  }

  if (method === "PUT") {
    const product = await client.product.update({
      data: {
        title: body.title,
        mainCategory: body.mainCategory,
        middleCategory: body.middleCategory,
        price: body.price,
        tradeMethod: body.tradeMethod,
        tradeRegion: body.tradeRegion,
        recommedAge: body.recommendAge,
        gender: body.gender,
        description: body.description,
      },
      where: {
        id: parseInt(productId as string),
      },
      include: {
        File: {
          select: {
            id: true,
            filePath: true,
          },
        },
      },
    });

    const file = product.File[0];
    if (file.filePath !== body.imageUrl) {
      await client.file.update({
        data: {
          filePath: body.imageUrl,
        },
        where: {
          id: file.id,
        },
      });
    }

    res.json({ ok: true });
  }
}

export default withHandler({
  methods: ["GET", "PUT"],
  handler,
});
