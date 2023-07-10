import NextAuth from "next-auth/next";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import client from "common/utils/server/client";

export const authOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NEXT_PUBLIC_AUTH_NAVER_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_NAVER_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_AUTH_KAKAO_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_KAKAO_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      console.log("### async token / token => ", token);
      console.log("### async token / account => ", account);
      console.log("### async token / profile => ", profile);
      return token;
    },
    // async signIn(props: any) {
    //   console.log("### signIn => ", props);
    //   const { user, account, profile, email, credentials } = props;

    //   const userInfo = await client.user.findFirst({
    //     where: { email: user?.email },
    //   });

    //   console.log("### userInfo => ", userInfo);
    //   if (!userInfo) {
    //     await client.user.create({
    //       data: {
    //         name: user?.name,
    //         email: user?.email,
    //         avatar: user?.image,
    //         provider: account.provider,
    //       },
    //     });
    //   }

    //   return true;
    // },
    // async redirect({ url, baseUrl }: any) {
    //   console.log("### redirect => ", url, baseUrl);
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return "http://localhost:3000/profile";
    // },

    async session({ session, token }: any) {
      console.log("### async session / session => ", session);
      console.log("### async session / token => ", token);

      const userInfo = await client.user.findUnique({
        where: {
          email: session?.user?.email,
        },
        include: { Child: true, Profile: true },
      });

      console.log("### userInfo => ", userInfo);

      if (userInfo) {
        const { Child, Profile, ...user } = userInfo;
        return {
          ...session,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            provider: user.provider,
            nickname: Profile[0]?.nickname,
            birthday: Profile[0]?.birthday,
            gender: Profile[0]?.gender,
            mobile: Profile[0]?.mobile,
            zonecode: Profile[0]?.zonecode,
            address: Profile[0]?.address,
            detailAddress: Profile[0]?.detailAddress,
            children: Child,
          },
        };
      } else {
        return session;
      }
    },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // },
  },
};

export default NextAuth(authOptions);
