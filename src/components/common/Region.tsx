import { ChangeEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useFormContext } from "react-hook-form";

import { RegionResponse, getRegionGus, getRegionSidos } from "@services/region";
import { Select } from "./elements";

interface RegionProps {
  name: string;
  required?: boolean;
}

const Region = ({ name, required = false }: RegionProps) => {
  const [sido, setSido] = useState<string>("");
  const [tempRegion, setTempRegion] = useState<string>("");

  const { watch, setValue } = useFormContext();
  const region = watch(name);

  const { data: sidos } = useQuery<RegionResponse>(
    "getRegionSidos",
    getRegionSidos
  );

  const { data: gus, isSuccess } = useQuery<RegionResponse>(
    ["getRegionGus", sido?.substring(0, 2)],
    () => getRegionGus(sido?.substring(0, 2)),
    { enabled: Boolean(sido) }
  );

  useEffect(() => {
    if (sido === "" && region !== "") {
      setTempRegion(region);
      setValue(name, "");

      const getSido = sidos?.regcodes.find(
        (item) => item.name === region.split(" ")[0]
      );
      if (getSido) {
        setSido(getSido.code);
      }
    }
  }, [sido, region, sidos]);

  useEffect(() => {
    if (isSuccess) {
      if (sido && tempRegion) {
        setValue(name, tempRegion);
      }
    }
  }, [isSuccess, sido, tempRegion]);

  const handleChangeSido = (event: ChangeEvent<HTMLSelectElement>) => {
    setSido(event.target.value);
    setValue(name, "");
    setTempRegion("");
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
          name={name}
          required={required}
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
