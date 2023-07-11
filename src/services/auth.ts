import { JoinRequestBody } from "@pages/api/users/join";
import { callApi } from "common/utils/client/axiosInstances";

export const duplicateCheckNickName = async (nickName: string) => {
  return await callApi({
    url: `/api/users/nickName/${nickName}`,
    method: "GET",
  });
};

export const join = async (data: JoinRequestBody) => {
  return await callApi({
    url: "/api/users/join",
    method: "POST",
    data,
  });
};
