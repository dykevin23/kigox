import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

const beforeRequest = (config: any) => {
  try {
    config.headers[
      "Authorization"
    ] = `KakaoAk ${process.env.NEXT_PUBLIC_AUTH_KAKAO_CLIENT_ID}`;
  } catch (error) {
    console.log("### error => ", error);
  }

  return config;
};

const kakaoInstances = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_AUTH_KAKAO_CLIENT_ID}`,
  },
});
kakaoInstances.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    return {
      status: response.status,
      data: response.data,
    } as AxiosResponse<any, any>;
  }
);

export const kakaoApi = async ({
  url,
  method,
  data,
  params,
}: AxiosRequestConfig) => {
  return await kakaoInstances({
    url,
    method,
    data,
    params,
  });
};
