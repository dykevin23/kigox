import Link from "next/link";

import { convertUtcToDate } from "@common/utils/helper/dateHelper";
import { IChannelList } from "types/chatTypes";

interface ChannelProps {
  chat: IChannelList;
}

const Channel = (props: ChannelProps) => {
  const {
    chat: {
      channelId,
      partner,
      lastMessage,
      lastUpdatedAt = "",
      newChatCount = 0,
    },
  } = props;

  return (
    <Link href={`/chat/${channelId}`} className="flex pt-3 w-full">
      <div className="w-20">
        <div className="bg-slate-300 h-14 w-14 rounded-lg" />
      </div>
      <div className="flex w-full justify-between pr-2">
        <div className="flex flex-col justify-start">
          <span className="text-base font-medium text-slate-900 pt-1 pb-2">
            {partner?.profile[0].nickname}
          </span>
          <span className="text-xs text-slate-500">{lastMessage}</span>
        </div>
        <div className="flex flex-col justify-start items-end">
          <span className="text-sm font-medium text-slate-900 pt-1 pb-2">
            {convertUtcToDate(lastUpdatedAt)}
          </span>
          {newChatCount > 0 && (
            <div className="w-4 h-4 rounded-full bg-red-400 flex items-center justify-center p-2.5">
              <span className="text-white text-xs">{newChatCount}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Channel;
