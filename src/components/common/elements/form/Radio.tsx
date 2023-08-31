import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { RadioField } from "../fields";
import { cls } from "@common/utils/helper/utils";

interface RadioGroupOptions {
  label?: string;
  value: any;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  options: RadioGroupOptions[];
  defaultValue?: any;
  vertical?: boolean;
  reverse?: boolean;
}

export const RadioGroup = (props: RadioGroupProps) => {
  const {
    name,
    options,
    defaultValue,
    vertical = false,
    reverse = false,
  } = props;

  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    if (options.find((item) => item.value === defaultValue)) {
      if (!getValues(name)) {
        setValue(name, defaultValue);
      }
    }
  }, [defaultValue]);

  return (
    <div
      className={cls(
        "flex w-full items-center ml-2 gap-3",
        vertical ? "flex-col" : "flex-row"
      )}
    >
      {options?.map((option) => (
        <div key={option.value} className="flex flex-row gap-1">
          <Radio
            name={name}
            label={option.label}
            value={option.value}
            reverse={reverse}
          />
        </div>
      ))}
    </div>
  );
};

interface RadioProps {
  label?: string;
  value: any;
  name: string;
  reverse?: boolean;
}
export const Radio = (props: RadioProps) => {
  const { label = "", value, name, reverse } = props;

  const { register, setValue, watch } = useFormContext();

  return (
    <div
      className={cls(
        "flex items-center gap-2",
        reverse ? "flex-row-reverse" : "flex-row"
      )}
      onClick={() => setValue(name, value)}
    >
      <RadioField
        register={register(name)}
        value={value}
        checked={watch(name) === value}
      />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
};
