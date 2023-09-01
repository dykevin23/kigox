import { cls } from "@common/utils/helper/utils";

export const SelectField = ({ children, register, error, ...rest }: any) => {
  return (
    <select
      {...register}
      className={cls(
        "appearance-none w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 ",
        error
          ? "focus:outline-none focus:ring-red-500 focus:border-red-500 border-red-500 placeholder-red-500"
          : "focus:outline-none focus:ring-yellow-300 focus:border-yellow-300"
      )}
      {...rest}
    >
      {children}
    </select>
  );
};

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
  isSelected?: boolean;
}
export const Option = (props: SelectOption) => {
  const { label, value, disabled = false, isSelected = false } = props;
  return <option value={value}>{label}</option>;
};
