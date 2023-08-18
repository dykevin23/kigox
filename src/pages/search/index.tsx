import { CategoryList } from "@components/common/category";
import { Layout } from "@components/layout";

const Search = () => {
  return (
    <Layout hasGnbMenu headerProps={{ left: "goBack" }}>
      <div className="flex flex-col gap-2">
        <div>search</div>
        <div>
          Category
          <CategoryList onSelect={() => {}} />
        </div>
      </div>
    </Layout>
  );
};

export default Search;
