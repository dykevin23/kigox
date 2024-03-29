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
import Children from "@components/auth/Children";
import { SelectOption } from "@components/common/elements/fields";
import { Card } from "@components/layout";

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

  const [incomeRangeOptions, setIncomeRangeOptions] = useState<SelectOption[]>([
    { label: "", value: "" },
  ]);

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
      <div className="h-screen bg-slate-100">
        <div className="max-h-full overflow-y-auto">
          <FormProvider {...joinMethods}>
            <Form
              label="회원가입"
              onSubmit={joinMethods.handleSubmit(onValid, onInvalid)}
            >
              <Card>
                <div className="flex gap-2 items-center">
                  <div className="w-1 h-6 bg-amber-800" />
                  <span className="text-lg font-medium text-amber-800">
                    부모정보
                  </span>
                </div>
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

                <Select
                  name="incomeRange"
                  options={incomeRangeOptions}
                  required="소득정보를 선택하세요."
                />
              </Card>
              <Card>
                <Children childrens={childrenFields} />
              </Card>
            </Form>
          </FormProvider>
        </div>
      </div>

      {/* {isOpenPostCode && <PostCode onClose={() => setIsOpenPostCode(false)} />} */}
    </>
  );
};

export default Join;
