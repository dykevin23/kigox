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
    (errors[key] as any)[index][field]
  );
};
