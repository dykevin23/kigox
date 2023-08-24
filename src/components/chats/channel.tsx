import { convertUtcToDate } from "@common/utils/helper/dateHelper";
import Link from "next/link";
import { IChannel } from "types/chatTypes";

interface ChannelProps {
  chat: IChannel;
}

const Channel = (props: ChannelProps) => {
  const {
    chat: { channelId, partner, lastMessage, lastUpdatedAt = "" },
  } = props;

  return (
    <Link href={`/chat/${channelId}`} className="flex gap-2 pt-3 w-full">
      <div className="bg-slate-300 h-10 w-10 rounded-md" />
      <div className="flex flex-col w-64">
        <span>{partner?.profile[0].nickname}</span>
        <span>{lastMessage}</span>
        <span>{convertUtcToDate(lastUpdatedAt)}</span>
      </div>
    </Link>
  );
};

export default Channel;
