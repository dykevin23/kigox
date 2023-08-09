import { callApi } from "@common/utils/client/axiosInstances";
import { ResponseType } from "@common/utils/server/withHandler";
import { ProductsRequestParams } from "@pages/api/products";
import { IMainCategory } from "types/metadataType";

export const products = async ({ childId }: ProductsRequestParams) => {
  return await callApi({
    url: "/api/products",
    method: "GET",
    params: { childId },
  });
};

export const category = async () => {
  const result = await callApi<ResponseType<IMainCategory[]>>({
    url: "/api/products/category",
    method: "GET",
  });

  return result.result
};
