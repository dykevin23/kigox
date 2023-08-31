import { cls } from "@common/utils/helper/utils";
import { RadioField } from "./fields";

interface RadioGroupOptions {
  label?: string;
  value: any;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  options: RadioGroupOptions[];
  value?: any;
  vertical?: boolean;
  reverse?: boolean;
  onChange: (value: any) => void;
}
export const ControlledRadioGroup = (props: RadioGroupProps) => {
  const {
    name,
    options,
    value,
    vertical = false,
    reverse = false,
    onChange,
  } = props;
  return (
    <div
      className={cls(
        "flex w-full items-center ml-2 gap-3",
        vertical ? "flex-col" : "flex-row"
      )}
    >
      {options?.map((option) => (
        <ControlledRadio
          name={name}
          key={option.value}
          label={option.label}
          value={option.value}
          isSelected={option.value === value}
          reverse={reverse}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

interface RadioProps {
  name: string;
  label?: string;
  value: any;
  isSelected: boolean;
  reverse?: boolean;
  onChange: (value: any) => void;
}
export const ControlledRadio = (props: RadioProps) => {
  const {
    name,
    label = "",
    value,
    isSelected = false,
    reverse = false,
    onChange,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    onChange(value);
  };

  return (
    <div
      className={cls(
        "flex items-center gap-2",
        reverse ? "flex-row-reverse" : "flex-row"
      )}
      onClick={() => onChange(value)}
    >
      <RadioField
        id={name}
        value={value}
        onChange={handleChange}
        checked={isSelected}
      />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
};
