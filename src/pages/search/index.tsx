import { useEffect, useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";

import { CategoryList } from "@components/common/category";
import { ControlledInput } from "@components/common/elements";
import {
  Box,
  Container,
  GoBack,
  InfiniteScroll,
  Layout,
} from "@components/layout";
import SearchHistory from "@components/search/SearchHistory";
import { insertHistory, searchProducts } from "@services/search";
import Product from "@components/products/product";
import { IProduct } from "types/productTypes";
import { PaginationResponse } from "@common/utils/server/withHandler";

type SearchElement = "history" | "category" | "products";

const Search = () => {
  const queryClient = useQueryClient();
  const [keyword, setKeyword] = useState<string>("");
  const [searchParams, setSearchParams] = useState<string>("");
  const [visibleElement, setVisibleElement] =
    useState<SearchElement>("category");

  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PaginationResponse<IProduct[]>>(
      ["searchProducts", searchParams],
      ({ pageParam = 1 }) => searchProducts(searchParams, pageParam),
      {
        enabled: Boolean(searchParams),
        getNextPageParam: (lastPage) => {
          return lastPage.isLast ? false : lastPage.pageNo + 1;
        },
      }
    );

  const { mutate, isLoading } = useMutation("insertHistory", insertHistory);

  const handleClick = () => {
    if (keyword === "") {
      setVisibleElement("history");
    }
  };
  const handleBlur = () => {
    setTimeout(() => {
      if (visibleElement === "history" && keyword === "") {
        setVisibleElement("category");
      }
    }, 100);
  };

  const handleChangeKeyword = (value: string) => {
    setKeyword(value);
  };

  const handleSearch = () => {
    setSearchParams(keyword);

    if (isLoading) return;
    mutate(keyword);
  };

  const handleInit = () => {
    queryClient.resetQueries(["searchProducts", searchParams]);
    setSearchParams("");
    setVisibleElement("history");
  };

  useEffect(() => {
    if (isSuccess) setVisibleElement("products");
  }, [isSuccess]);

  const handleScroll = () => fetchNextPage();

  return (
    <Layout hasGnbMenu hasHeader={false}>
      <div className="flex justify-center w-full mb-1">
        <SearchInput
          keyword={keyword}
          onClick={handleClick}
          onBlur={handleBlur}
          onChange={handleChangeKeyword}
          onSearch={handleSearch}
          onInit={handleInit}
        />
      </div>
      <Container>
        <div className="h-full">
          {visibleElement === "category" && (
            <div>
              Category
              <CategoryList onSelect={() => {}} />
            </div>
          )}
          {visibleElement === "history" && <SearchHistory />}
          {visibleElement === "products" && (
            <Box>
              <InfiniteScroll
                hasNextPage={hasNextPage}
                isFetching={isFetchingNextPage}
                onScroll={() => handleScroll()}
              >
                <div className="flex flex-col space-y-3 divide-y mb-24">
                  {data?.pages
                    .map((item) => item.products)
                    .flatMap((page) => page)
                    ?.map((product) => (
                      <Product key={product.id} product={product} />
                    ))}
                </div>
              </InfiniteScroll>
            </Box>
          )}
        </div>
      </Container>
    </Layout>
  );
};

interface SearchInputProps {
  keyword: string;
  onClick: () => void;
  onBlur: () => void;
  onChange: (value: string) => void;
  onSearch: () => void;
  onInit: () => void;
}
const SearchInput = (props: SearchInputProps) => {
  const { keyword, onClick, onBlur, onChange, onSearch, onInit } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    onChange(value);

    if (value === "") {
      onInit();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      onSearch();
    }
  };

  // "appearance-none w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 border-gray-300 placeholder-gray-400 pl-10",
  return (
    <div className="w-full">
      <ControlledInput
        name="search"
        value={keyword}
        onChange={handleChange}
        onClick={onClick}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        prefix={<GoBack />}
      />
    </div>
  );
};

export default Search;
