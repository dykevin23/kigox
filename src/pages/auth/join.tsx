import { getToken } from "next-auth/jwt";
import { getCsrfToken, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { duplicateCheckNickName, join } from "services/auth";

const Join = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("### session => ", session);
  }, [session]);

  const [nickName, setNickName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");

  const {
    isSuccess: isSuccessNickNameDuplicateCheck,
    data: duplicateCheckNickNameData,
  } = useQuery(
    ["duplicate/check/nickName", nickName],
    () => duplicateCheckNickName(nickName),
    { enabled: !!nickName }
  );

  const {
    mutate: mutateJoin,
    isLoading: isLoadingJoin,
    isSuccess: isSuccessJoin,
    data: joinData,
  } = useMutation("join", join);

  // useEffect(() => {
  //   console.log(
  //     "### nickname duplicate check => ",
  //     isSuccessNickNameDuplicateCheck,
  //     duplicateCheckNickNameData
  //   );
  // }, [isSuccessNickNameDuplicateCheck, duplicateCheckNickNameData]);

  useEffect(() => {
    console.log("### join => ", isSuccessJoin, joinData);
  }, [isSuccessJoin, joinData]);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoadingJoin) {
      mutateJoin({ userId: session?.user?.id, nickname: nickName, birthday });
    }
    console.log("handleSubmit => ", nickName, birthday, address, detailAddress);
  };

  return (
    <div className="bg-yellow-300 h-screen max-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col pt-3 m-3 gap-2">
          <input
            value={nickName}
            type="text"
            placeholder="닉네임을 입력해주세요.(10자 이내)"
            onChange={(e) => setNickName(e.target.value)}
          />
          <input
            value={session?.user?.email}
            readOnly
            placeholder="이메일을 입력해주세요."
          />
          <input
            type="date"
            value={birthday}
            placeholder="생년월일(YYYY-MM-DD)"
            onChange={(e) => setBirthday(e.target.value)}
          />
          <input
            type="text"
            value={address}
            placeholder="도로명주소"
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            value={detailAddress}
            placeholder="상세주소"
            onChange={(e) => setDetailAddress(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="회원가입" />
        </div>
      </form>
    </div>
  );
};

export default Join;
