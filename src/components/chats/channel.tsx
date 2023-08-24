import { convertUtcToDate } from "@common/utils/helper/dateHelper";
import { IChannel } from "types/chatTypes";

interface ChannelProps {
  chat: IChannel;
  onClick: () => void;
}

const Channel = (props: ChannelProps) => {
  const {
    chat: { partner, lastMessage, lastUpdatedAt = "" },
    onClick,
  } = props;

  return (
    <div className="flex gap-2 pt-3 w-full" onClick={onClick}>
      <div className="bg-slate-300 h-10 w-10 rounded-md" />
      <div className="flex flex-col w-64">
        <span>{partner?.profile[0].nickname}</span>
        <span>{lastMessage}</span>
        <span>{convertUtcToDate(lastUpdatedAt)}</span>
      </div>
    </div>
  );
};

export default Channel;
