import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { cls } from "@common/utils/helper/utils";

export interface SelectOptions {
  label: string;
  value: any;
  disabled?: boolean;
}

interface SelectProps {
  name: string;
  options: SelectOptions[];
  required?: boolean | string;
  useInitOption?: boolean;
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const Select = (props: SelectProps) => {
  const {
    name,
    options,
    required = false,
    useInitOption = false,
    value,
    onChange,
  } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [initOption] = useState<SelectOptions[]>(
    useInitOption ? [{ label: "선택하세요.", value: "" }] : []
  );

  return (
    <div className="flex flex-col gap-1">
      <select
        {...register(name, { required: required })}
        className={cls(
          "appearance-none w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 ",
          errors[name]
            ? "focus:outline-none focus:ring-red-500 focus:border-red-500 border-red-500 placeholder-red-500"
            : "focus:outline-none focus:ring-yellow-300 focus:border-yellow-300"
        )}
        value={value}
        onChange={onChange}
      >
        {initOption.concat(options).map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      {errors[name] && (
        <span className="flex items-start text-xs text-red-500">
          <>{errors[name]?.message}</>
        </span>
      )}
    </div>
  );
};

export default Select;
