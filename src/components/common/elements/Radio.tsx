import { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface RadioGroupOptions {
  label?: string;
  value: any;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  options: RadioGroupOptions[];
  defaultValue?: any;
  vertical?: boolean;
  register: UseFormRegisterReturn;
}

export const RadioGroup = (props: RadioGroupProps) => {
  const { name, options, defaultValue, register } = props;
  return (
    <div className="flex w-full items-center ml-2 gap-2">
      {options.map((option) => {
        return (
          <div key={option.value} className="flex flex-row gap-1">
            <Radio name={name} value={option.value} register={register} />
            {option?.label && <span className="text-sm">{option.label}</span>}
          </div>
        );
      })}
    </div>
  );
};

interface RadioProps {
  label?: string;
  value: any;
  name: string;
  register?: UseFormRegisterReturn;
  isSelected?: boolean;
  onChange?: Function;
}
export const Radio = (props: RadioProps) => {
  const { value, name, register, isSelected, onChange } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };
  return register ? (
    <input type="radio" id={name} value={value} {...register} />
  ) : (
    <input
      type="radio"
      id={name}
      value={value}
      checked={isSelected}
      onChange={handleChange}
    />
  );
};
