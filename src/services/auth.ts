import axios from "axios";

export interface getTokenProps {
  code: string;
  state: string;
}

export const getToken = ({ code, state }: getTokenProps) => {
  return axios({
    url: "/api/auth/naver/getToken",
    method: "POST",
    data: {
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_AUTH_NAVER_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_AUTH_NAVER_CLIENT_SECRET,
      code,
      state,
    },
  });
};
