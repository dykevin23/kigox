import { useFormContext } from "react-hook-form";

import { TextField } from "../fields";
import HelperText from "../HelperText";
import { cls, convertCurrency } from "@common/utils/helper/utils";

type InputTypes = "textField" | "currency";
interface InputProps {
  name: string;
  type?: string;
  inputType?: InputTypes;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean | string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onClick?: () => void;
}
const Input = (props: InputProps) => {
  const {
    name,
    type = "text",
    inputType = "textField",
    placeholder = "",
    readOnly = false,
    required = false,
    error = "",
    prefix,
    suffix,
    onClick,
  } = props;

  const {
    register,
    setValue,
    trigger,
    formState: { errors: fieldError },
  } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputType === "currency") {
      setValue(name, convertCurrency(event.target.value));
    } else {
      setValue(name, event.target.value);
    }
    trigger();
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center shadow-sm relative">
        {prefix ? (
          <div className="absolute inset-y-0 flex left-2 items-center pr-3">
            {prefix}
          </div>
        ) : null}
        <TextField
          id={name}
          type={type}
          placeholder={placeholder}
          readOnly={readOnly}
          onClick={onClick}
          error={error || fieldError[name]}
          register={register(name, { required: required })}
          className={cls(
            "",
            prefix ? "pl-10" : "",
            suffix || ["currency"].includes(inputType) ? "text-right pr-8" : ""
          )}
          onChange={handleChange}
        />
        {suffix || ["currency"].includes(inputType) ? (
          <div className="absolute inset-y-0 flex right-3 items-center pl-3 pointer-events-none">
            {suffix || <span>원</span>}
          </div>
        ) : null}
      </div>
      {(error || fieldError[name]) && (
        <HelperText
          type="error"
          message={error || (fieldError[name]?.message as string)}
        />
      )}
    </div>
  );
};

export default Input;
