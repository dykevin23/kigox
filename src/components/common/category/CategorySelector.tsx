import { useEffect } from "react";
import { useQuery } from "react-query";
import { useFormContext } from "react-hook-form";

import { useModal } from "@common/hooks";
import CategoryList from "./CategoryList";
import { IMainCategory, IMiddleCategory } from "types/metadataType";
import { category } from "@services/products";
import { Input } from "../elements";

interface CategorySelectorProps {
  name: string;
  mainCategory: string;
  middleCategory: string;
  onChange: (value: IMiddleCategory) => void;
}
const CategorySelector = (props: CategorySelectorProps) => {
  const { name, mainCategory = "", middleCategory = "", onChange } = props;

  const { show, hide } = useModal();
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
    show({
      type: "slide",
      component: (
        <CategoryList
          onSelect={handleSelect}
          selectedCategory={[parseInt(mainCategory), parseInt(middleCategory)]}
        />
      ),
    });
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
      readOnly={true}
      onClick={handleClick}
      required="카테고리를 선택하세요."
    />
  );
};

export default CategorySelector;
