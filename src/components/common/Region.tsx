import { ChangeEvent, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { useQuery } from "react-query";

import { ProductRegisterForm } from "@pages/product/register";
import { RegionResponse, getRegionGus, getRegionSidos } from "@services/region";
import { Select } from "./elements";

interface RegionProps {
  register: UseFormRegister<ProductRegisterForm>;
}

const Region = ({ register }: RegionProps) => {
  const [sido, setSido] = useState<string>("");

  const { data: sidos } = useQuery<RegionResponse>(
    "getRegionSidos",
    getRegionSidos
  );

  const { data: gus } = useQuery<RegionResponse>(
    ["getRegionGus", sido?.substring(0, 2)],
    () => getRegionGus(sido?.substring(0, 2)),
    { enabled: Boolean(sido) }
  );

  const handleChangeSido = (event: ChangeEvent<HTMLSelectElement>) => {
    setSido(event.target.value);
  };

  return (
    <div className="flex gap-2">
      <div className="w-1/2">
        <Select
          name="sido"
          value={sido}
          options={
            sidos?.regcodes.map((item) => {
              return { label: item.name, value: item.code };
            }) ?? []
          }
          onChange={handleChangeSido}
        />
      </div>

      <div className="w-1/2">
        <Select
          name="sido"
          register={register("tradeRegion", { required: true })}
          options={
            gus?.regcodes
              .filter((item) => item.code !== sido)
              .map((item) => {
                return { label: item.name.split(" ")[1], value: item.name };
              }) ?? []
          }
        />
      </div>
    </div>
  );
};

export default Region;
