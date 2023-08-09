import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { cls } from "@utils/index";

interface TextAreaProps {
  name: string;
  placeholder?: string;
  error?: FieldError;
  readonly?: boolean;
  register: UseFormRegisterReturn;
}

const TextArea = (props: TextAreaProps) => {
  const { name, placeholder = "", error, readonly = false, register } = props;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center shadow-sm relative">
        <textarea
          id={name}
          placeholder={placeholder}
          readOnly={readonly}
          {...register}
          rows={5}
          className={cls(
            "appearance-none w-full px-3 py-2 border rounded-md shadow-sm ",
            readonly
              ? "focus:outline-none"
              : "focus:outline-none focus:ring-yellow-300 focus:border-yellow-300",
            error
              ? "focus:outline-none focus:ring-red-500 focus:border-red-500 border-red-500 placeholder-red-500"
              : "border-gray-300 placeholder-gray-400 "
          )}
        />
      </div>
      {error?.type !== "required" && (
        <span className="flex items-start text-xs text-red-500">
          {error?.message}
        </span>
      )}
    </div>
  );
};

export default TextArea;
