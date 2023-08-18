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
  onClick?: () => void;
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
    onClick,
  } = props;

  const {
    register,
    formState: { errors: fieldError },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <TextField
        inputProps={{
          id: name,
          type: type,
          placeholder: placeholder,
          readOnly: readonly,
          className: cls(
            "appearance-none w-full px-3 py-2 border rounded-md shadow-sm ",
            readonly
              ? "focus:outline-none"
              : "focus:outline-none focus:ring-yellow-300 focus:border-yellow-300",
            errors || fieldError[name]
              ? "focus:outline-none focus:ring-red-500 focus:border-red-500 border-red-500 "
              : "border-gray-300 placeholder-gray-400 ",
            ["currency"].includes(inputType) ? "text-right pr-8" : ""
          ),
          onClick: onClick,
          ...register(name, { required: required }),
        }}
        suffix={["currency"].includes(inputType) && <span>원</span>}
      />
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

interface TextFieldProps {
  inputProps: any;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}
export const TextField = (props: TextFieldProps) => {
  const { inputProps, prefix, suffix } = props;
  return (
    <div className="flex items-center shadow-sm relative">
      {prefix ? (
        <div className="absolute inset-y-0 flex left-2 items-center pr-3">
          {prefix}
        </div>
      ) : null}
      <input {...inputProps} />
      {suffix ? (
        <div className="absolute inset-y-0 flex right-3 items-center pl-3 pointer-events-none">
          {suffix}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
