import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";

import { INCOME_RANGE } from "@common/constants/server";
import PostCode, { AddressCoords } from "@components/common/PostCode";
import { duplicateCheckNickName, join } from "@services/auth";
import { IChild } from "types/userTypes";
import { Input, Form, RadioGroup, Select } from "@components/common/elements";
import { SelectOptions } from "@components/common/elements/Select";
import Children from "@components/auth/Children";

export interface JoinForm extends AddressCoords {
  nickname: string;
  email: string;
  birthday: string;
  gender: string;
  zonecode: string;
  address: string;
  detailAddress: string;
  incomeRange: string;
  children: IChild[];
}

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

    setIncomeRangeOptions([{ label: "없음", value: "" }].concat(incomeRange));
  }, []);

  useEffect(() => {
    if (session) {
      setValue("email", session?.user?.email);
    }
  }, [session]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JoinForm>();
  const childrenFields = useFieldArray<JoinForm>({ control, name: "children" });

  const onValid = (value: JoinForm) => {
    if (!isLoadingJoin) {
      mutateJoin({ userId: session?.user?.id as number, ...value });
    }
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log("### onInvalid => ", errors);
  };

  const [incomeRangeOptions, setIncomeRangeOptions] = useState<SelectOptions[]>(
    [{ label: "", value: "" }]
  );

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

  // const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   if (!isLoadingJoin) {
  //     mutateJoin({
  //       userId: session?.user?.id as number,
  //       nickname: nickName,
  //       birthday,
  //       gender,
  //       zonecode,
  //       address,
  //       detailAddress,
  //       addressCoords,
  //       incomeRange,
  //       children,
  //     });
  //   }
  // };

  ////////////////////////////////////////

  return (
    <>
      <div className="h-screen max-h-screen">
        <Form>
          <Input
            register={register("nickname", {
              required: "닉네임을 입력해주세요.(10자 이내)",
            })}
            name="nickname"
            placeholder="닉네임을 입력해주세요.(10자 이내)"
            error={errors.nickname}
          />
          <Input register={register("email")} name="email" readonly={true} />
          <div className="flex justify-between">
            <Input
              register={register("birthday", {
                required: "생년월일을 입력해주세요.",
              })}
              name="birthday"
              placeholder="생년월일(YYYY-MM-DD)"
              error={errors.birthday}
            />
            <RadioGroup
              register={register("gender")}
              name="gender"
              options={[
                { label: "남자", value: "male" },
                { label: "여자", value: "female" },
              ]}
              defaultValue="male"
            />
          </div>

          <PostCode
            onComplete={(data) => {
              setValue("zonecode", data.zonecode);
              setValue("address", data.address);
              setValue("longitude", data.longitude);
              setValue("latitude", data.latitude);
            }}
            register={register}
            errors={errors}
          />

          <Select
            name="incomeRange"
            options={incomeRangeOptions}
            register={register("incomeRange", {
              required: "월간 소득금액을 선택해주세요.",
            })}
            error={errors.incomeRange}
          />

          <Children childrens={childrenFields} register={register} />
        </Form>
      </div>
      <div
        className="flex items-center justify-center cursor-pointer pt-3 pb-3 border-t bg-yellow-300 fixed bottom-0 w-full max-w-xl"
        onClick={handleSubmit(onValid, onInvalid)}
      >
        회원가입
        {/* <Button label="회원가입" type="submit" /> */}
      </div>
      {/* {isOpenPostCode && <PostCode onClose={() => setIsOpenPostCode(false)} />} */}
    </>
  );
};

export default Join;
