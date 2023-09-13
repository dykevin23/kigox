import { cls } from "@common/utils/helper/utils";

const TextField = ({ readOnly, error, register, className, ...rest }: any) => {
  const getStyles = () => {
    let className = "";

    if (error) {
      className += " focus:ring-red-500 focus:border-red-500 border-red-500";
    } else {
      if (readOnly) {
        className += " placeholder-gray-400";
      } else {
        className += " focus:ring-yellow-300 focus:border-yellow-300 ";
      }
    }

    return className;
  };

  return (
    <input
      {...register}
      readOnly={readOnly}
      className={cls(
        "appearance-none w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none placeholder-gray-400",
        getStyles(),
        className
      )}
      {...rest}
    />
  );
};

export default TextField;
