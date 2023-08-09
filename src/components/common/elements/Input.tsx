import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { cls } from "@utils/index";

type InputTypes = "textField" | "currency";
interface InputProps {
  name: string;
  type?: string;
  inputType?: InputTypes;
  placeholder?: string;
  error?: FieldError;
  readonly?: boolean;
  register: UseFormRegisterReturn;
}

const Input = (props: InputProps) => {
  const {
    name,
    type = "text",
    inputType = "textField",
    placeholder = "",
    error,
    readonly = false,
    register,
  } = props;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center shadow-sm relative">
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          readOnly={readonly}
          {...register}
          className={cls(
            "appearance-none w-full px-3 py-2 border rounded-md shadow-sm ",
            readonly
              ? "focus:outline-none"
              : "focus:outline-none focus:ring-yellow-300 focus:border-yellow-300",
            error
              ? "focus:outline-none focus:ring-red-500 focus:border-red-500 border-red-500 placeholder-red-500"
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
      {error?.type !== "required" && (
        <span className="flex items-start text-xs text-red-500">
          {error?.message}
        </span>
      )}
    </div>
  );
};

export default Input;
