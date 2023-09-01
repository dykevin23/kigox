import { useState } from "react";

import { SelectProps } from "./form/Select";
import { Option, SelectField, SelectOption } from "./fields";
import HelperText from "./HelperText";

interface ControlledSelectProps extends SelectProps {
  value: any;
  error?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const ControlledSelect = (props: ControlledSelectProps) => {
  const {
    name,
    options,
    required = false,
    useInitOption = false,
    value,
    error = "",
    onChange,
  } = props;

  const [initOption] = useState<SelectOption[]>(
    useInitOption
      ? [
          {
            label:
              typeof useInitOption === "string" ? useInitOption : "선택하세요.",
            value: "",
          },
        ]
      : []
  );

  return (
    <div className="flex flex-col gap-1">
      <SelectField error={error} onChange={onChange}>
        {initOption
          .concat(options)
          ?.map((option: SelectOption) => (
            <Option
              key={option.value}
              {...option}
              isSelected={option.value === value}
            />
          ))}
      </SelectField>
      {error && <HelperText type="error" message={error} />}
    </div>
  );
};

export default ControlledSelect;
