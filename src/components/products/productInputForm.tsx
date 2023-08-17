import { useFormContext } from "react-hook-form";

import { GENDER, RECOMMEND_AGE, TRADE_METHOD } from "@common/constants/server";
import Category from "@components/common/Category";
import Region from "@components/common/Region";
import {
  ImageUpload,
  Input,
  Select,
  TextArea,
} from "@components/common/elements";
import { IMiddleCategory } from "types/metadataType";

export interface IProductInputForm {
  images: FileList;
  imageUrl: string;
  title: string;
  mainCategory: string;
  middleCategory: string;
  price: string;
  tradeMethod: string;
  tradeRegion: string;
  recommendAge: string;
  gender: string;
  description?: string;
}

const ProductInputForm = () => {
  const { setValue, watch } = useFormContext();

  const handleImageChange = (file: FileList) => {
    setValue("images", file);
  };

  const handleChangeCategory = (value: IMiddleCategory) => {
    setValue("mainCategory", String(value.mainCategoryId));
    setValue("middleCategory", String(value.id));
  };

  return (
    <>
      <ImageUpload imageUrl={watch("imageUrl")} onChange={handleImageChange} />
      <Input name="title" placeholder="제목을 입력하세요." required />

      <Category
        mainCategory={watch("mainCategory")}
        middleCategory={watch("middleCategory")}
        onChange={handleChangeCategory}
      />

      <Input name="price" inputType="currency" required />

      <Select
        name="tradeMethod"
        options={Object.keys(TRADE_METHOD).map((key) => {
          return { label: TRADE_METHOD[key], value: key };
        })}
        required
        useInitOption
      />

      <Region name="tradeRegion" required={true} />

      <Select
        name="recommendAge"
        required
        options={Object.keys(RECOMMEND_AGE).map((key) => {
          return { label: RECOMMEND_AGE[key], value: key };
        })}
        useInitOption
      />

      <Select
        name="gender"
        options={Object.keys(GENDER).map((key) => {
          return { label: GENDER[key], value: key };
        })}
        required
      />

      <TextArea name="description" />
    </>
  );
};

export default ProductInputForm;
