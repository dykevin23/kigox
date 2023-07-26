import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { signIn } from "next-auth/react";

import { kakaoApi } from "@common/utils/client/kakaoInstances";
import {
  UserListResponse,
  getUserList,
  updateUserAddressCoords,
} from "@services/users";
import { IUser } from "types/userTypes";

const Login = () => {
  const {
    data: userListData,
    isSuccess: isSuccessGetUserList,
    refetch: fetchGetUserList,
  } = useQuery<UserListResponse>("getUserList", getUserList, {
    enabled: false,
  });

  const { mutate } = useMutation(
    "updateUserAddressCoords",
    updateUserAddressCoords
  );

  useEffect(() => {
    if (isSuccessGetUserList) {
      console.log("### userListData => ", userListData);
      const { userList } = userListData;

      if (userList.filter((item: IUser) => item.zonecode !== "0").length > 0) {
        console.log("### userListData => ", userList);
        updateUserAddress(userList);
      }
    }
  }, [isSuccessGetUserList, userListData]);

  const updateUserAddress = async (userList: IUser[]) => {
    for (var user of userList) {
      const { status, data } = await callKakao(user);
      if (status === 200) {
        console.log("### data => ", data);
        const { documents } = data;
        const { x, y, road_address } = documents[0];
        mutate({
          profileId: user.id,
          longitude: x,
          latitude: y,
          zonecode: road_address.zone_no,
        });
      }
    }
  };

  const callKakao = async (user: IUser) => {
    return await kakaoApi({
      url: `https://dapi.kakao.com/v2/local/search/address.json`,
      method: "GET",
      params: { query: user.address },
    });
  };

  const handleGetAddress = () => {
    fetchGetUserList();
  };

  return (
    <div className="bg-yellow-300 h-screen max-h-screen">
      <div className="flex justify-center items-center pt-48 pb-48">
        <span className="text-6xl">KIGOX</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <button
          className="bg-green-400 w-28 rounded-lg"
          onClick={() => signIn("naver")}
        >
          네이버
        </button>
        <button
          className="bg-yellow-200 w-28 rounded-lg"
          onClick={() => signIn("kakao")}
        >
          카카오
        </button>
        {/* <button
          className="bg-yellow-200 w-28 rounded-lg"
          onClick={handleGetAddress}
        >
          주소정보
        </button> */}
      </div>
    </div>
  );
};

export default Login;
