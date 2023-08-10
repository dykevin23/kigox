import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";

import { GENDER, RECOMMEND_AGE, TRADE_METHOD } from "@common/constants/server";
import Category from "@components/common/Category";
import Region from "@components/common/Region";
import {
  Button,
  Form,
  Input,
  Select,
  TextArea,
} from "@components/common/elements";
import { Layout } from "@components/layout";
import { IMiddleCategory, TradeMethodType } from "types/metadataType";
import { registProduct } from "@services/products";

export interface ProductRegisterForm {
  title: string;
  mainCategory: string;
  middleCategory: string;
  price: string;
  tradeMethod: TradeMethodType;
  tradeRegion: string;
  recommendAge: string;
  gender: string;
  description: string;
}

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<ProductRegisterForm>();

  const { mutate, isLoading, isSuccess } = useMutation(
    "registProduct",
    registProduct
  );

  const handleChangeCategory = (value: IMiddleCategory) => {
    setValue("mainCategory", String(value.mainCategoryId));
    setValue("middleCategory", String(value.id));
  };

  const onValid = (data: ProductRegisterForm) => {
    if (isLoading) return;
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/", undefined, { shallow: true });
    }
  }, [isSuccess]);

  return (
    <Layout
      hasGnbMenu={false}
      headerProps={{ left: "goBack", center: <div>상품등록</div> }}
    >
      <div className="flex flex-col gap-2 ">
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            name="title"
            register={register("title", { required: true })}
            placeholder="제목을 입력하세요."
          />
          <Category
            mainCategory={watch("mainCategory")}
            middleCategory={watch("middleCategory")}
            onChange={handleChangeCategory}
          />
          <Input
            name="price"
            register={register("price", { required: true })}
            inputType="currency"
          />
          <Select
            name="tradeMethod"
            register={register("tradeMethod", { required: true })}
            options={Object.keys(TRADE_METHOD).map((key) => {
              return { label: TRADE_METHOD[key], value: key };
            })}
          />
          <Region register={register} />

          <Select
            name="recommendAge"
            register={register("recommendAge", { required: true })}
            options={Object.keys(RECOMMEND_AGE).map((key) => {
              return { label: RECOMMEND_AGE[key], value: key };
            })}
          />
          <Select
            name="gender"
            register={register("gender", { required: true })}
            options={Object.keys(GENDER).map((key) => {
              return { label: GENDER[key], value: key };
            })}
          />
          <TextArea name="description" register={register("description")} />

          <Button label="등록" type="submit" />
        </Form>
      </div>
    </Layout>
  );
};

export default Register;
