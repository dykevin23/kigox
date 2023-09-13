import { FieldErrors } from "react-hook-form";

export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export const getFieldArrayError = (
  errors: FieldErrors,
  key: string,
  index: number,
  field: string
) => {
  return (
    errors[key] &&
    (errors[key] as any)[index] &&
    (errors[key] as any)[index][field] &&
    (errors[key] as any)[index][field].message
  );
};

export const convertCurrency = (inputValue: string | number) => {
  if (typeof inputValue === "string") {
    const value = parseInt(inputValue.replace(/,/g, ""), 10);
    return value.toLocaleString();
  } else if (typeof inputValue === "number") {
    const value = parseInt(String(inputValue).replace(/,/g, ""), 10);
    return value.toLocaleString();
  } else {
    return inputValue;
  }
};
