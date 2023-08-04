import { cls } from "@utils/index";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface SelectOptions {
  label: string;
  value: any;
  disabled?: boolean;
}

interface SelectProps {
  name: string;
  options: SelectOptions[];
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const Select = (props: SelectProps) => {
  const { options, register, error } = props;
  return (
    <div className="flex flex-col gap-1">
      <select
        {...register}
        className={cls(
          "appearance-none w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 ",
          error
            ? "focus:outline-none focus:ring-red-500 focus:border-red-500 border-red-500 placeholder-red-500"
            : "focus:outline-none focus:ring-yellow-300 focus:border-yellow-300"
        )}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      {error && (
        <span className="flex items-start text-xs text-red-500">
          {error?.message}
        </span>
      )}
    </div>
  );
};

export default Select;
