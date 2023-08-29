import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { category } from "@services/products";
import { IMainCategory, IMiddleCategory } from "types/metadataType";
import { Accordion } from "../elements";
import { cls } from "@common/utils/helper/utils";

interface CategoryListProps {
  selectedCategory?: number[];
  onSelect: (value: IMiddleCategory) => void;
}
const CategoryList = (props: CategoryListProps) => {
  const { selectedCategory, onSelect } = props;

  const [isActives, setIsActives] = useState<boolean[]>([false]);
  const { data, isSuccess } = useQuery<IMainCategory[]>("category", category);

  useEffect(() => {
    if (isSuccess) {
      setIsActives(Array(data.length).fill(true));
    }
  }, [isSuccess, data]);

  const handleClick = (index: number) => {
    setIsActives(
      isActives.map((item, itemIndex) => {
        return itemIndex === index ? !item : item;
      })
    );
  };

  const handleSelectCategory =
    (selected: IMiddleCategory) =>
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      onSelect(selected);
    };

  return (
    <div className="flex flex-col gap-1">
      {data?.map((main, index: number) => {
        return (
          <Accordion
            key={main.id}
            label={main.name}
            isActive={isActives[index]}
            onClick={() => handleClick(index)}
          >
            <div className="grid grid-cols-3 auto-cols-fr auto-rows-fr">
              {main.middleCategory.map((middle) => {
                return (
                  <div
                    key={middle.id}
                    className={cls(
                      "flex h-6 items-center justify-center border ",
                      selectedCategory &&
                        main.id === selectedCategory[0] &&
                        middle.id === selectedCategory[1]
                        ? "bg-yellow-400"
                        : ""
                    )}
                    onClick={handleSelectCategory(middle)}
                  >
                    <span className="text-sm font-medium text-gray-600">
                      {middle.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </Accordion>
        );
      })}
    </div>
  );
};

export default CategoryList;
