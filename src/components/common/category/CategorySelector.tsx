import { useEffect } from "react";
import { useQuery } from "react-query";
import { useFormContext } from "react-hook-form";

import useLayerModal from "@common/hooks/useLayerModal";
import { Input } from "../elements";
import CategoryList from "./CategoryList";
import { IMainCategory, IMiddleCategory } from "types/metadataType";
import { category } from "@services/products";

interface CategorySelectorProps {
  name: string;
  mainCategory: string;
  middleCategory: string;
  onChange: (value: IMiddleCategory) => void;
}
const CategorySelector = (props: CategorySelectorProps) => {
  const { name, mainCategory = "", middleCategory = "", onChange } = props;

  const { show, hide } = useLayerModal();
  const { setValue } = useFormContext();

  const { data } = useQuery<IMainCategory[]>("category", category);

  useEffect(() => {
    if (middleCategory) {
      if (data) {
        const main = data?.find((item) => item.id === parseInt(mainCategory));

        if (main) {
          const middle = main.middleCategory.find(
            (item) => item.id === parseInt(middleCategory)
          );

          if (middle) {
            setValue(name, `${main.name} > ${middle.name}`);
          }
        }
      }
    } else {
      setValue(name, "");
    }
  }, [mainCategory, middleCategory, data]);

  const handleClick = () => {
    show(<CategoryList onSelect={handleSelect} />);
  };

  const handleSelect = (category: IMiddleCategory) => {
    if (middleCategory) {
      if (
        parseInt(middleCategory) !== category.id ||
        parseInt(mainCategory) !== category.mainCategoryId
      ) {
        onChange(category);
      }
    } else {
      onChange(category);
    }

    hide();
  };

  return (
    <Input
      name={name}
      placeholder="카테고리를 선택하세요."
      readonly={true}
      onClick={handleClick}
      required="카테고리를 선택하세요."
    />
  );
};

export default CategorySelector;
