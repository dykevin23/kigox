import { PrismaClient } from "@prisma/client";
import {
  MainCategory,
  MiddleCategory,
  Standard,
  mainCategory,
  middleCategory,
  standardData,
} from "./initData";

const client = new PrismaClient();

async function main() {
  standardData.forEach(async (data: Standard) => {
    await client.standardData.create({
      data: {
        key: data.key,
        standardType: data.standardType,
        min: data.min,
        max: data.max,
        value: data.value,
        unit: data.unit,
        score: data.score,
        weight: data.weight,
      },
    });
  });

  mainCategory.forEach(async (data: MainCategory) => {
    const main = await client.mainCategory.create({
      data: {
        category: data.category,
        name: data.name,
        isUse: true,
      },
    });

    if (main) {
      middleCategory.forEach(async (middle: MiddleCategory) => {
        await client.middleCategory.create({
          data: {
            category: middle.category,
            name: middle.name,
            isUse: true,
            mainCategoryId: main.id,
          },
        });
      });
    }
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
