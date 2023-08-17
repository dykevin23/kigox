import { ChangeEvent, useEffect } from "react";
import { useFormContext } from "react-hook-form";

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
}

export const RadioGroup = (props: RadioGroupProps) => {
  const { name, options, defaultValue = "" } = props;
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue]);
  return (
    <div className="flex w-full items-center ml-2 gap-2">
      {options.map((option) => {
        return (
          <div key={option.value} className="flex flex-row gap-1">
            <Radio name={name} value={option.value} />
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
  isSelected?: boolean;
  onChange?: Function;
}
export const Radio = (props: RadioProps) => {
  const { value, name, isSelected, onChange } = props;

  const { register } = useFormContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };
  return register ? (
    <input type="radio" id={name} value={value} {...register(name)} />
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
