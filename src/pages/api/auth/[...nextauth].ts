import NextAuth from "next-auth/next";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

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
    async jwt({ token }: any) {
      console.log("### token => ", token);
      return token;
    },
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true;
    // },
    async redirect({ url, baseUrl }: any) {
      // console.log("### redirect url => ", url);
      // console.log("### redirect baseUrl => ", baseUrl);
      return baseUrl;
    },
    async session({ session }: any) {
      console.log("### session => ", session);
      return session;
    },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // },
  },
};

export default NextAuth(authOptions);
