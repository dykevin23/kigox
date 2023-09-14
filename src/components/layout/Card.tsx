import { cls } from "@common/utils/helper/utils";

interface CardProps {
  children: React.ReactNode;
  bgColor?: string;
}

const Card = ({ children, bgColor = "bg-white" }: CardProps) => {
  return (
    <div className={cls("flex flex-col p-3 gap-2 rounded-md", bgColor)}>
      {children}
    </div>
  );
};

export default Card;
