import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Option, SelectField, SelectOption } from "../fields";
import HelperText from "../HelperText";

export interface SelectProps {
  name: string;
  options: SelectOption[];
  required?: boolean | string;
  useInitOption?: string | boolean;
}
const Select = (props: SelectProps) => {
  const { name, options, required = false, useInitOption = false } = props;

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const [initOption] = useState<SelectOption[]>(
    useInitOption
      ? [
          {
            label:
              typeof useInitOption === "string" ? useInitOption : "선택하세요.",
            value: "",
          },
        ]
      : []
  );

  return (
    <div className="flex flex-col gap-1">
      <SelectField
        register={register(name, { required: required })}
        error={errors[name]}
      >
        {initOption
          .concat(options)
          ?.map((option: SelectOption) => (
            <Option
              key={option.value}
              {...option}
              isSelected={option.value === watch(name)}
            />
          ))}
      </SelectField>
      {errors[name] && (
        <HelperText type="error" message={errors[name]?.message as string} />
      )}
    </div>
  );
};

export default Select;
