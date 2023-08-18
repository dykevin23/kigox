import { callApi } from "@common/utils/client/axiosInstances";
import { ResponseType } from "@common/utils/server/withHandler";
import { IProduct } from "types/productTypes";
import { ISearchHistory } from "types/searchTypes";

export const searchProducts = async (keyword: string) => {
  const { products } = await callApi<ResponseType<IProduct[]>>({
    url: "/api/products/search",
    method: "GET",
    params: { keyword },
  });

  return products;
};

export const searchHistory = async () => {
  const { history } = await callApi<ResponseType<ISearchHistory[]>>({
    url: "/api/products/search/history",
    method: "GET",
  });

  return history;
};

export const insertHistory = async (keyword: string) => {
  return await callApi<ResponseType<ISearchHistory[]>>({
    url: "/api/products/search/history",
    method: "POST",
    data: { keyword },
  });
};

export const deleteHistory = async (id: number) => {
  return await callApi({
    url: `/api/products/search/${id}`,
    method: "DELETE",
  });
};
