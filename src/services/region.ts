import { callApi } from "@common/utils/client/axiosInstances";

export interface RegionResponse {
  regcodes: { code: string; name: string }[];
}

export const getRegionSidos = async () => {
  return await callApi<RegionResponse>({
    url: "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000",
    method: "GET",
  });
};

export const getRegionGus = async (sido: string) => {
  return await callApi<RegionResponse>({
    url: `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${sido}*000000`,
    method: "GET",
  });
};
