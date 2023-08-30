import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import {
  FieldErrors,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";

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

  const [incomeRangeOptions, setIncomeRangeOptions] = useState<SelectOptions[]>(
    [{ label: "", value: "" }]
  );

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
      joinMethods.setValue("email", session?.user?.email);
    }
  }, [session]);

  const joinMethods = useForm<JoinForm>();
  const childrenFields = useFieldArray<JoinForm>({
    control: joinMethods.control,
    name: "children",
  });

  const onValid = (value: JoinForm) => {
    if (isLoadingJoin) return;

    mutateJoin({ userId: session?.user?.id as number, ...value });
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log("### onInvalid => ", errors);
  };

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

  return (
    <>
      <div className="h-screen max-h-screen">
        <FormProvider {...joinMethods}>
          <Form>
            <Input
              name="nickname"
              placeholder="닉네임을 입력해주세요.(10자 이내)"
              required="닉네임을 입력해주세요.(10자 이내)"
            />
            <Input name="email" readOnly={true} />
            <div className="flex justify-between">
              <Input
                name="birthday"
                placeholder="생년월일(YYYY-MM-DD)"
                required="생년월일을 입력해주세요."
              />
              <RadioGroup
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
                joinMethods.setValue("zonecode", data.zonecode);
                joinMethods.setValue("address", data.address);
                joinMethods.setValue("longitude", data.longitude);
                joinMethods.setValue("latitude", data.latitude);
              }}
            />

            <Select name="incomeRange" options={incomeRangeOptions} />

            <Children childrens={childrenFields} />

            <div
              className="flex items-center justify-center cursor-pointer pt-3 pb-3 border-t bg-yellow-300 fixed bottom-0 w-full max-w-xl"
              onClick={joinMethods.handleSubmit(onValid, onInvalid)}
            >
              회원가입
            </div>
          </Form>
        </FormProvider>
      </div>

      {/* {isOpenPostCode && <PostCode onClose={() => setIsOpenPostCode(false)} />} */}
    </>
  );
};

export default Join;
