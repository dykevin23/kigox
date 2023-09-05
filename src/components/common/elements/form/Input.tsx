import { useFormContext } from "react-hook-form";
import { TextField } from "../fields";
import HelperText from "../HelperText";

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
    formState: { errors: fieldError },
  } = useFormContext();

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
          className={["currency"].includes(inputType) ? "text-right pr-8" : ""}
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
