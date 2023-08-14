import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";
import { downloadImagesUrl } from "@common/utils/helper/fileHelper";
import { IProduct } from "types/productTypes";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<IProduct[]>>,
  session: any
) {
  const products = await client.product.findMany({
    where: {
      childId: session.activeChildId,
    },
    include: {
      File: {
        select: {
          filePath: true,
        },
      },
    },
  });

  let list: IProduct[] = [];
  for (var product of products) {
    const imageUrl = await downloadImagesUrl(
      product?.File[0].filePath as string
    );

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
      image: imageUrl,
    });
  }

  res.json({ ok: true, products: list });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
