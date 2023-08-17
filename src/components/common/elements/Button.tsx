import { MouseEventHandler } from "react";

interface ButtonProps {
  label: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
  const { label, type = "button", disabled = false, onClick } = props;

  return (
    <button
      className="border border-transparent w-full bg-yellow-300 hover:bg-yellow-400 py-2 text-sm px-4 rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 focus:outline-none"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
