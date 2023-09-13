import { callApi } from "@common/utils/client/axiosInstances";
import {
  PaginationResponse,
  ResponseType,
} from "@common/utils/server/withHandler";
import { ProductRequestBody, ProductsRequestParams } from "@pages/api/products";
import { IMainCategory } from "types/metadataType";
import { IProduct } from "types/productTypes";

export const products = async ({
  pageNo = 1,
}: ProductsRequestParams): Promise<PaginationResponse<IProduct[]>> => {
  const { products, isLast } = await callApi<ResponseType<IProduct[]>>({
    url: "/api/products",
    method: "GET",
    params: { pageNo },
  });

  return {
    products: products as IProduct[],
    isLast,
    pageNo,
  };
};

export const category = async () => {
  const result = await callApi<ResponseType<IMainCategory[]>>({
    url: "/api/products/category",
    method: "GET",
  });

  return result.result;
};

export const registProduct = async (data: ProductRequestBody) => {
  return await callApi({
    url: "/api/products",
    method: "POST",
    data,
  });
};

export const modifyProduct = async (
  productId: string,
  data: ProductRequestBody
) => {
  return await callApi({
    url: `/api/products/${productId}`,
    method: "PUT",
    data,
  });
};

export const productDetail = async (productId: string) => {
  const { product } = await callApi<ResponseType<IProduct>>({
    url: `/api/products/${productId}`,
    method: "GET",
  });

  return product;
};

export const salesProducts = async () => {
  const { products } = await callApi<ResponseType<IProduct[]>>({
    url: "/api/products/sales",
    method: "GET",
  });

  return products;
};

export const favProduct = async (productId: number) => {
  return await callApi({
    url: `/api/products/${productId}/fav`,
    method: "POST",
  });
};

export const favsProducts = async () => {
  const { products } = await callApi<ResponseType<IProduct[]>>({
    url: "/api/products/favs",
    method: "GET",
  });

  return products;
};

export const isFavProduct = async (productId: number) => {
  const { isFav } = await callApi<ResponseType<boolean>>({
    url: `/api/products/${productId}/fav`,
    method: "GET",
  });

  return isFav;
};
