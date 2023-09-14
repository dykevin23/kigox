import { callApi } from "@common/utils/client/axiosInstances";
import { ResponseType } from "@common/utils/server/withHandler";
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

export const getUser = async (childId: number) => {
  const { user } = await callApi<ResponseType<IUser>>({
    url: `/api/users/${childId}`,
    method: "GET",
  });

  return user;
};

export const updateUserAddressCoords = async (data: UserAddressRequestBody) => {
  return await callApi({
    url: `/api/users/${data.profileId}/address`,
    method: "PUT",
    data,
  });
};
