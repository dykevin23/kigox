import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@common/utils/server/withHandler";
import client from "@common/utils/server/client";
import {
  calculateAge,
  calculateDisparityRate,
  getMaxStandardData,
  getStandardData,
} from "@common/utils/helper/coreHelper";
import { IStandard } from "types/metadataType";

export interface ProductsRequestParams {
  pageNo: number;
}

export interface IStandardChild {
  childId?: number;
  parentAge: number;
  parentGender: number;
  incomeRange: number;
  childAge: number;
  childGender: number;
}

export interface ProductRequestBody {
  imageUrl: string;
  title: string;
  mainCategory: string;
  middleCategory: string;
  price: string;
  tradeMethod: string;
  tradeRegion: string;
  recommendAge: string;
  gender: string;
  description?: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<any>>,
  session: any
) {
  const {
    query: { pageNo },
    body,
    method,
  } = req;

  if (method === "GET") {
    const result = await client.child.findMany({
      select: {
        id: true,
        user: {
          select: {
            Profile: {
              select: {
                birthday: true,
                gender: true,
                incomeRange: true,
              },
            },
          },
        },
        birthday: true,
        gender: true,
      },
    });

    const standardData = (await client.standardData.findMany(
      {}
    )) as IStandard[];

    const allChildList: IStandardChild[] = result.map((item) => {
      const { birthday, gender, incomeRange } = item.user.Profile[0];
      return {
        childId: item.id,
        parentAge: getStandardData(
          "age",
          String(calculateAge(birthday)),
          standardData
        ),
        parentGender: getStandardData("gender", gender, standardData),
        incomeRange: parseInt(incomeRange as string),
        childAge: getStandardData(
          "childAge",
          String(calculateAge(item.birthday)),
          standardData
        ),
        childGender: getStandardData("childGender", item.gender, standardData),
      };
    });

    const standardDataWithWeight = getMaxStandardData(
      allChildList,
      standardData
    );

    const me = allChildList.find(
      (child) => child.childId === parseInt(session.activeChildId)
    ) as IStandardChild;
    const children = allChildList.filter(
      (child) => child.childId !== parseInt(session.activeChildId)
    );

    const disparityRateResult = calculateDisparityRate({
      me,
      children,
      standard: standardDataWithWeight,
    });

    const childIds = disparityRateResult.map((item) => item.childId);
    const products = await client.$queryRaw`
      SELECT
        *,
        (SELECT filePath 
         FROM File B
         WHERE B.productId = A.id) as image
      FROM Product A
      ORDER BY FIND_IN_SET(childId, ${childIds.join(",")})
      LIMIT 5 OFFSET ${(parseInt(pageNo as string) - 1) * 5 + 1}
    `;

    res.json({ ok: true, products });
  }

  if (method === "POST") {
    const product = await client.product.create({
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
        status: "sale",
        child: {
          connect: {
            id: parseInt(session.activeChildId),
          },
        },
      },
    });

    await client.file.create({
      data: {
        filePath: body.imageUrl,
        type: "image",
        product: {
          connect: {
            id: product.id,
          },
        },
      },
    });

    res.json({ ok: true });
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
});
