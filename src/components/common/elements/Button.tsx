import { cls } from "@common/utils/helper/utils";

type ButtonTypes = "primary" | "secondary" | "tetriary" | "light" | "dark";
interface ButtonProps {
  label: string;
  isSubmit?: boolean;
  type?: ButtonTypes;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
  const {
    label,
    isSubmit = false,
    type = "secondary",
    disabled = false,
    onClick,
  } = props;

  const getStyleClass = (type: ButtonTypes) => {
    if (type === "primary") {
      return "shadow-sm  bg-yellow-400 text-amber-900 hover:bg-yellow-500 focus:ring-yellow-500 focus:ring-2 focus:ring-offset-2";
    } else if (type === "secondary") {
      return "shadow-sm bg-yellow-200 text-amber-700 hover:bg-yellow-300 focus:ring-yellow-500 focus:ring-2 focus:ring-offset-2";
    } else if (type === "tetriary") {
      return "bg-white text-yellow-600 hover:text-yellow-700";
    } else if (type === "light") {
      return "shadow-sm bg-neutral-50 shadow-[0_4px_9px_-4px_#cbcbcb] hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)]";
    } else if (type === "dark") {
      return "bg-neutral-800 text-white shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]";
    } else {
      return "shadow-sm  bg-yellow-400 text-amber-900 hover:bg-yellow-500 focus:ring-yellow-500 focus:ring-2 focus:ring-offset-2";
    }
  };

  return (
    <button
      className={cls(
        "border border-transparent w-full py-2 text-sm px-4 rounded-md font-medium  focus:outline-none",
        getStyleClass(type)
      )}
      type={isSubmit ? "submit" : "button"}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
