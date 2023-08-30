import { cls } from "@common/utils/helper/utils";

const TextField = ({ readOnly, error, register, className, ...rest }: any) => {
  return (
    <input
      {...register}
      className={cls(
        "appearance-none w-full px-3 py-2 border rounded-md shadow-sm ",
        readOnly
          ? "focus:outline-none"
          : "focus:outline-none focus:ring-yellow-300 focus:border-yellow-300",
        error
          ? "focus:outline-none focus:ring-red-500 focus:border-red-500 border-red-500 "
          : "border-gray-300 placeholder-gray-400 ",
        className
      )}
      {...rest}
    />
  );
};

export default TextField;
