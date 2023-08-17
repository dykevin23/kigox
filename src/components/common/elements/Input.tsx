import { FieldError, useFormContext } from "react-hook-form";
import HelperText from "./HelperText";
import { cls } from "@common/utils/helper/utils";

type InputTypes = "textField" | "currency";
interface InputProps {
  name: string;
  type?: string;
  inputType?: InputTypes;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean | string;
  errors?: FieldError;
}

const Input = (props: InputProps) => {
  const {
    name,
    type = "text",
    inputType = "textField",
    placeholder = "",
    readonly = false,
    required = false,
    errors,
  } = props;

  const {
    register,
    formState: { errors: fieldError },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center shadow-sm relative">
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          readOnly={readonly}
          {...register(name, { required: required })}
          className={cls(
            "appearance-none w-full px-3 py-2 border rounded-md shadow-sm ",
            readonly
              ? "focus:outline-none"
              : "focus:outline-none focus:ring-yellow-300 focus:border-yellow-300",
            errors || fieldError[name]
              ? "focus:outline-none focus:ring-red-500 focus:border-red-500 border-red-500 "
              : "border-gray-300 placeholder-gray-400 ",
            ["currency"].includes(inputType) ? "text-right pr-8" : ""
          )}
        />
        {["currency"].includes(inputType) && (
          <div className="absolute inset-y-0 flex right-3 items-center pl-3 pointer-events-none">
            <span>원</span>
          </div>
        )}
      </div>
      {(errors || fieldError[name]) && (
        <HelperText
          type="error"
          message={
            (errors?.message as string) || (fieldError[name]?.message as string)
          }
        />
      )}
    </div>
  );
};

export default Input;
