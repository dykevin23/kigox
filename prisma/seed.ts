import { PrismaClient } from "@prisma/client";
import { Child, User, userList } from "./initData";

const client = new PrismaClient();

async function main() {
  userList.forEach(async (user: User) => {
    const createUser = await client.user.create({
      data: {
        email: user.email,
        name: user.name,
        provider: user.provider,
      },
    });

    if (createUser) {
      await client.profile.create({
        data: {
          nickname: user.name,
          birthday: user.profile.birthday,
          gender: user.profile.gender,
          mobile: user.profile.mobile,
          zonecode: "0",
          address: user.profile.address,
          detailAddress: user.profile.detailAddress,
          // latitude: documents && documents.length > 0 ? documents[0].y : "0",
          // longitude: documents && documents.length > 0 ? documents[0].x : "0",
          incomeRange: user.profile.incomeRange,
          user: {
            connect: {
              id: createUser.id,
            },
          },
        },
      });

      user.children.forEach(async (child: Child) => {
        await client.child.create({
          data: {
            birthday: child.birthday,
            gender: child.gender,
            user: {
              connect: {
                id: createUser.id,
              },
            },
          },
        });
      });
    }
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
