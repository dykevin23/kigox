import { MouseEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";

import useLayerModal from "@common/hooks/useLayerModal";
import { cls } from "@common/utils/helper/utils";
import { category } from "@services/products";
import { IMainCategory, IMiddleCategory } from "types/metadataType";

interface CategoryProps {
  mainCategory: string;
  middleCategory: string;
  onChange: (value: IMiddleCategory) => void;
}
const Category = (props: CategoryProps) => {
  const { mainCategory = "", middleCategory = "", onChange } = props;
  const { show, hide } = useLayerModal();
  const { data, isSuccess } = useQuery<IMainCategory[]>("category", category);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (middleCategory) {
      if (data) {
        const main = data?.find((item) => item.id === parseInt(mainCategory));

        if (main) {
          const middle = main.middleCategory.find(
            (item) => item.id === parseInt(middleCategory)
          );

          if (middle) {
            setCategoryName(`${main.name} > ${middle.name}`);
          }
        }
      }
    } else {
      setCategoryName("");
    }
  }, [mainCategory, middleCategory, data]);

  const handleClick = () => {
    if (data) {
      show(<SelectCategory categoryList={data} onSelect={handleSelect} />);
    }
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
    <div className="flex items-center shadow-sm ">
      <input
        placeholder="카테고리를 선택하세요."
        readOnly={true}
        value={categoryName}
        className={cls(
          "appearance-none w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-300 focus:border-yellow-300",
          ""
          // error
          //   ? "focus:outline-none focus:ring-red-500 focus:border-red-500 border-red-500 placeholder-red-500"
          //   : "border-gray-300 placeholder-gray-400 "
        )}
        onClick={handleClick}
      />
    </div>
  );
};

interface SelectCategoryProps {
  categoryList: IMainCategory[];
  onSelect: Function;
}
const SelectCategory = ({ categoryList, onSelect }: SelectCategoryProps) => {
  const handleClick =
    (selected: IMiddleCategory) => (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      onSelect(selected);
    };

  return (
    <div className="flex flex-col gap-2">
      {categoryList.map((main) => {
        return (
          <div key={main.id} className="flex flex-col">
            <div className="border-2 rounded-md p-2">
              {" > "}
              {main.name}
            </div>
            <div className="grid grid-cols-3 auto-cols-fr auto-rows-fr">
              {main.middleCategory.map((middle) => {
                return (
                  <div
                    key={middle.id}
                    className="flex items-center justify-center border"
                    onClick={handleClick(middle)}
                  >
                    <span>{middle.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
