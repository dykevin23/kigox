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
      console.log("######## jwt");
      console.log("### token => ", token);
      console.log("### account => ", account);
      console.log("### profile => ", profile);
      return token;
    },
    async signIn(props: any) {
      console.log("### signIn => ", props);
      const { user, account, profile, email, credentials } = props;

      const userInfo = await client.user.findFirst({
        where: {
          email: user?.email,
        },
      });

      console.log("### userInfo => ", userInfo);

      if (userInfo) {
        return true;
      } else {
        return "/auth/apply";
      }
    },
    // async redirect({ url, baseUrl }: any) {
    //   console.log("### redirect => ", url, baseUrl);
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return "http://localhost:3000/profile";
    // },

    async session({ session, token }: any) {
      console.log("### session => ", session);
      // console.log("### token => ", token);

      // const result = await client.user.findUnique({
      //   where: {
      //     email: session?.user?.email,
      //   },
      // });

      // console.log("### result => ", result);

      return session;
    },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // },
  },
};

export default NextAuth(authOptions);
