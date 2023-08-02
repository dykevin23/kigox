import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";

import { INCOME_RANGE } from "@common/constants/server";
import Child from "@components/common/Child";
import PostCode, { AddressCoords } from "@components/common/PostCode";
import { duplicateCheckNickName, join } from "@services/auth";
import { IChild } from "types/userTypes";

const Join = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("### session => ", session);

    const incomeRange = Object.keys(INCOME_RANGE).map((key: string) => {
      const [minIncome, maxIncome] = INCOME_RANGE[key];
      return {
        label: maxIncome
          ? `${minIncome}이상 ~ ${maxIncome}이하`
          : `${minIncome}이상`,
        value: key,
      };
    });

    setIncomeRangeOptions([{ label: "없음", value: "-1" }].concat(incomeRange));
  }, []);

  const [nickName, setNickName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [zonecode, setZonecode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [addressCoords, setAddressCoords] = useState<AddressCoords>({
    latitude: null,
    longitude: null,
  });
  const [incomeRange, setIncomeRange] = useState<string>("-1");
  const [children, setChildren] = useState<IChild[]>([
    { birthday: "", gender: "male" },
  ]);

  const [isOpenPostCode, setIsOpenPostCode] = useState<boolean>(false);
  const [incomeRangeOptions, setIncomeRangeOptions] = useState<
    { label: string; value: any }[]
  >([{ label: "", value: "" }]);

  // const {
  //   isSuccess: isSuccessNickNameDuplicateCheck,
  //   data: duplicateCheckNickNameData,
  // } = useQuery(
  //   ["duplicate/check/nickName", nickName],
  //   () => duplicateCheckNickName(nickName),
  //   { enabled: !!nickName }
  // );

  const {
    mutate: mutateJoin,
    isLoading: isLoadingJoin,
    isSuccess: isSuccessJoin,
  } = useMutation("join", join);

  useEffect(() => {
    if (isSuccessJoin) {
      router.push("/", undefined, { shallow: true });
    }
  }, [isSuccessJoin]);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoadingJoin) {
      mutateJoin({
        userId: session?.user?.id as number,
        nickname: nickName,
        birthday,
        gender,
        zonecode,
        address,
        detailAddress,
        addressCoords,
        incomeRange,
        children,
      });
    }
  };

  const handleChildChange = (index: number) => (value: IChild) => {
    setChildren(
      children.map((child: IChild, childIndex: number) => {
        return childIndex === index ? value : child;
      })
    );
  };

  return (
    <>
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
            <div>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              남자
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              여자
            </div>
            <PostCode
              onComplete={(data) => {
                setZonecode(data.zonecode);
                setAddress(data.address);
                setAddressCoords({
                  latitude: data.latitude,
                  longitude: data.longitude,
                });
              }}
            />
            <input
              type="text"
              value={address}
              placeholder="도로명주소"
              readOnly
            />
            <input
              type="text"
              value={detailAddress}
              placeholder="상세주소"
              readOnly={address === ""}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
            <select
              value={incomeRange}
              onChange={(e) => setIncomeRange(e.target.value)}
            >
              {incomeRangeOptions.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            {children.map((child, index) => {
              return (
                <>
                  <Child
                    key={index}
                    {...child}
                    childIndex={index}
                    onChange={handleChildChange(index)}
                  />
                  {children.length - 1 === index && (
                    <button
                      onClick={() => {
                        setChildren(
                          children.concat({ birthday: "", gender: "male" })
                        );
                      }}
                    >
                      자녀추가
                    </button>
                  )}
                </>
              );
            })}
          </div>
          <div>
            <input type="submit" value="회원가입" />
          </div>
        </form>
      </div>
      {/* {isOpenPostCode && <PostCode onClose={() => setIsOpenPostCode(false)} />} */}
    </>
  );
};

export default Join;
