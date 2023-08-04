import { UseFormRegisterReturn } from "react-hook-form";

interface RadioOptions {
  label: string;
  value: any;
  disabled?: boolean;
}

interface RadioProps {
  name: string;
  options: RadioOptions[];
  defaultValue?: any;
  vertical?: boolean;
  register: UseFormRegisterReturn;
}

const Radio = (props: RadioProps) => {
  const { name, options, defaultValue, register } = props;
  return (
    <div className="flex w-full items-center ml-2 gap-2">
      {options.map((option) => {
        return (
          <div key={option.value} className="flex flex-row gap-1">
            <input
              type="radio"
              id={`${name}_${option.value}`}
              value={option.value}
              checked={defaultValue === option.value}
              {...register}
            />
            <span className="text-sm">{option.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Radio;
