import { cls } from "@common/utils/helper/utils";

type HelperType = "error" | "info" | "warning" | "success";

interface HelperTextProps {
  type: HelperType;
  message?: string;
}

const HelperText = (props: HelperTextProps) => {
  const { type = "info", message = "" } = props;
  return message !== "" ? (
    <span
      className={cls(
        "flex items-start text-xs ",
        type === "error" ? "text-red-500" : "text-gray-300"
      )}
    >
      {message}
    </span>
  ) : null;
};

export default HelperText;
