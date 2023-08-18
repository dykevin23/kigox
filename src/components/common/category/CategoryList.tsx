import { category } from "@services/products";
import { useQuery } from "react-query";
import { IMainCategory, IMiddleCategory } from "types/metadataType";

interface CategoryListProps {
  onSelect: (value: IMiddleCategory) => void;
}
const CategoryList = (props: CategoryListProps) => {
  const { onSelect } = props;
  const { data } = useQuery<IMainCategory[]>("category", category);

  const handleClick =
    (selected: IMiddleCategory) =>
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      onSelect(selected);
    };

  return (
    <div className="flex flex-col gap-2">
      {data?.map((main) => {
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

export default CategoryList;
