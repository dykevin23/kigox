import { cls } from "@common/utils/helper/utils";

type ChipTypes = "primary" | "info" | "warning" | "error" | "blank";
interface ChipsProps {
  label: string;
  type?: ChipTypes;
}

const Chips = (props: ChipsProps) => {
  const { label = "", type = "primary" } = props;

  const getChipStyles = (type: ChipTypes) => {
    if (type === "primary") {
      return "bg-blue-600 border-blue-700";
    } else if (type === "info") {
      return "bg-slate-500 border-slate-600";
    } else if (type === "warning") {
      return "bg-orange-500 border-orange-600";
    } else if (type === "error") {
      return "bg-red-500 border-red-600";
    } else {
      return " border-stone-900";
    }
  };

  const getTextStyles = (type: ChipTypes) => {
    if (type === "primary") {
      return "text-neutral-50";
    } else if (type === "info") {
      return "text-neutral-50";
    } else if (type === "warning") {
      return "text-neutral-50";
    } else if (type === "error") {
      return "text-neutral-50";
    } else {
      return "text-neutral-900";
    }
  };

  return (
    <div
      className={cls(
        "flex w-fit h-fit px-1 border rounded-sm",
        getChipStyles(type)
      )}
    >
      <span className={cls("text-xs ", getTextStyles(type))}>{label}</span>
    </div>
  );
};

export default Chips;
