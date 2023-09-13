import { callApi } from "@common/utils/client/axiosInstances";
import {
  PaginationResponse,
  ResponseType,
} from "@common/utils/server/withHandler";
import { IProduct } from "types/productTypes";
import { ISearchHistory } from "types/searchTypes";

export const searchProducts = async (
  keyword: string,
  pageNo: number
): Promise<PaginationResponse<IProduct[]>> => {
  const { products, isLast } = await callApi<ResponseType<IProduct[]>>({
    url: "/api/products/search",
    method: "GET",
    params: { keyword, pageNo: String(pageNo) },
  });

  return { products, isLast, pageNo };
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

export const deleteAllHistory = async () => {
  return await callApi({
    url: "/api/products/search/history",
    method: "DELETE",
  });
};
