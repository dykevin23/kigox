import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { CategoryList } from "@components/common/category";
import { TextField } from "@components/common/elements/Input";
import { GoBack, Layout } from "@components/layout";
import SearchHistory from "@components/search/SearchHistory";
import { insertHistory, searchProducts } from "@services/search";

type SearchElement = "history" | "category" | "products";

const Search = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [searchParams, setSearchParams] = useState<string>("");
  const [visibleElement, setVisibleElement] =
    useState<SearchElement>("category");

  const { data: products, isSuccess } = useQuery(
    ["searchProducts", searchParams],
    () => searchProducts(searchParams),
    { enabled: Boolean(searchParams) }
  );

  const { mutate, isLoading } = useMutation("insertHistory", insertHistory);

  const handleClick = () => setVisibleElement("history");
  const handleBlur = () => {
    // if(visibleElement !== 'history') {
    // }
    // setVisibleElement(keyword ? "history" : "category");
  };

  const handleChangeKeyword = (value: string) => {
    setKeyword(value);
  };

  const handleSearch = () => {
    setSearchParams(keyword);

    if (isLoading) return;
    mutate(keyword);
  };

  useEffect(() => {
    if (isSuccess) setVisibleElement("products");
  }, [isSuccess]);

  return (
    <Layout
      hasGnbMenu
      headerProps={{
        custom: (
          <SearchInput
            keyword={keyword}
            onClick={handleClick}
            onBlur={handleBlur}
            onChange={handleChangeKeyword}
            onSearch={handleSearch}
          />
        ),
      }}
    >
      <div className="flex flex-col gap-2">
        <div>search</div>
        {visibleElement === "category" && (
          <div>
            Category
            <CategoryList onSelect={() => {}} />
          </div>
        )}
        {visibleElement === "history" && <SearchHistory />}
        {/* {visibleElement === 'products'} */}
      </div>
    </Layout>
  );
};

interface SearchInputProps {
  keyword: string;
  onClick: () => void;
  onBlur: () => void;
  onChange: (value: string) => void;
  onSearch: () => void;
}
const SearchInput = (props: SearchInputProps) => {
  const { keyword, onClick, onBlur, onChange, onSearch } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    onChange(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      onSearch();
    }
  };

  return (
    <TextField
      prefix={<GoBack />}
      inputProps={{
        value: keyword,
        onChange: handleChange,
        className:
          "appearance-none w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 border-gray-300 placeholder-gray-400 pl-10",
        onClick: onClick,
        onBlur: onBlur,
        onKeyDown: handleKeyDown,
      }}
    />
  );
};

export default Search;
