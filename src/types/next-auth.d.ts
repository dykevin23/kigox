import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      avatar?: string;
      provider: string;
      nickname?: string;
      birthday?: string;
      gender?: string;
      mobile?: string;
      zonecode?: number;
      address?: string;
      detailAddress: string;
      children: any;
    };
    activeChildId: string;
  }
}
