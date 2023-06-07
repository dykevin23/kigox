import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const beforeRequest = (config: any) => {
  try {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      throw new Error("required authorization token");
    }
  } catch (error) {
    console.log("### error => ", error);
  }

  return config;
};

const axiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: "",
  },
});
axiosInstance.interceptors.request.use(beforeRequest);

export const sendApi = async ({
  url,
  method,
  data,
  params,
}: AxiosRequestConfig) => {
  return await axiosInstance({
    url,
    method,
    data,
    params,
  });
};
