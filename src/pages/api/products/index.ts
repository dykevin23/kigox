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
  childId: string;
}

export interface IStandardChild {
  childId?: number;
  parentAge: number;
  parentGender: number;
  incomeRange: number;
  childAge: number;
  childGender: number;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
  session: any
) {
  const {
    query: { childId },
  } = req;

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

  const standardData = (await client.standardData.findMany({})) as IStandard[];

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

  const standardDataWithWeight = getMaxStandardData(allChildList, standardData);

  const me = allChildList.find(
    (child) => child.childId === parseInt(childId as string)
  ) as IStandardChild;
  const children = allChildList.filter(
    (child) => child.childId !== parseInt(childId as string)
  );

  const disparityRateResult = calculateDisparityRate({
    me,
    children,
    standard: standardDataWithWeight,
  });
  // const me = children.find();

  //   console.log("### result => ", result, children);

  res.json({ ok: true, result, children: disparityRateResult });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
