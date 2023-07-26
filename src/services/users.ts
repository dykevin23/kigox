import { callApi } from "@common/utils/client/axiosInstances";
import { UserAddressRequestBody } from "@pages/api/users/[id]/address";
import { IUser } from "types/userTypes";

export interface UserListResponse {
  userList: IUser[];
}

export const getUserList = async () => {
  return await callApi<UserListResponse>({
    url: "/api/users",
    method: "GET",
  });
};

export const updateUserAddressCoords = async (data: UserAddressRequestBody) => {
  return await callApi({
    url: `/api/users/${data.profileId}/address`,
    method: "PUT",
    data,
  });
};
