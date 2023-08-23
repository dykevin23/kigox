import { cls } from "@common/utils/helper/utils";

interface MessageProps {
  message: string;
  isRead: boolean;
  reverse?: boolean;
  date: string;
}

const Message = (props: MessageProps) => {
  const { message, reverse } = props;
  return (
    <div
      className={cls(
        "flex  items-start",
        reverse ? "flex-row-reverse space-x-reverse" : "space-x-2"
      )}
    >
      <div className="w-8 h-8 rounded-full bg-slate-400" />
      <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
