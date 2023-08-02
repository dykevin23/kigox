import { callApi } from "@common/utils/client/axiosInstances";
import { ProductsRequestParams } from "@pages/api/products";

export const products = async ({ childId }: ProductsRequestParams) => {
  return await callApi({
    url: "/api/products",
    method: "GET",
    params: { childId },
  });
};
