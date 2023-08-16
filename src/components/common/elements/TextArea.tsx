import { useFormContext } from "react-hook-form";

import { cls } from "@utils/index";

interface TextAreaProps {
  name: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
}

const TextArea = (props: TextAreaProps) => {
  const { name, placeholder = "", readonly = false, required = false } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center shadow-sm relative">
        <textarea
          id={name}
          placeholder={placeholder}
          readOnly={readonly}
          {...register(name, { required })}
          rows={5}
          className={cls(
            "appearance-none w-full px-3 py-2 border rounded-md shadow-sm ",
            readonly
              ? "focus:outline-none"
              : "focus:outline-none focus:ring-yellow-300 focus:border-yellow-300",
            errors[name]
              ? "focus:outline-none focus:ring-red-500 focus:border-red-500 border-red-500 placeholder-red-500"
              : "border-gray-300 placeholder-gray-400 "
          )}
        />
      </div>
      {errors[name]?.type !== "required" && (
        <span className="flex items-start text-xs text-red-500">
          <>{errors[name]?.message}</>
        </span>
      )}
    </div>
  );
};

export default TextArea;
