import React from "react";
import { TextField } from "./fields";

interface InputProps {
  name: string;
  type?: string;
  value: any;
  placeholder?: string;
  readOnly?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ControlledInput = (props: InputProps) => {
  const {
    name,
    type = "text",
    value,
    placeholder = "",
    readOnly = false,
    prefix,
    suffix,
    onClick,
    onKeyDown,
    onBlur,
    onChange,
  } = props;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center shadow-sm relative">
        {prefix ? (
          <div className="absolute inset-y-0 flex left-2 items-center pr-3">
            {prefix}
          </div>
        ) : null}
        <TextField
          id={name}
          value={value}
          type={type}
          placeholder={placeholder}
          readOnly={readOnly}
          onClick={onClick}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
        {suffix ? (
          <div className="absolute inset-y-0 flex right-3 items-center pl-3 pointer-events-none">
            {suffix}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ControlledInput;
