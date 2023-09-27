import { Box, Layout } from "@components/layout";
import Channel from "@components/chats/channel";
import useChannelQuery from "@common/hooks/useChannelQuery";
import { useEffect, useState } from "react";
import useChatQuery from "@common/hooks/useChatQuery";
import { useQuery } from "react-query";
import { getChannels } from "@services/chat";
import { IChannelList } from "types/chatTypes";
import { useSession } from "next-auth/react";

const Chat = () => {
  const { data: session } = useSession();
  const [chatIds, setChatIds] = useState<string[]>([]);
  const channelIds = useChannelQuery();
  const chats = useChatQuery(chatIds);

  const [channels, setChannels] = useState<IChannelList[]>([]);

  const { data, isSuccess } = useQuery(
    "channels",
    () =>
      getChannels(
        channels.filter((item) => !item.partner).map((item) => item.channelId)
      ),
    { enabled: Boolean(channels.filter((item) => !item.partner).length > 0) }
  );
  useEffect(() => {
    console.log("### channelIds => ", channelIds);
    setChatIds(channelIds as string[]);
  }, [channelIds]);

  useEffect(() => {
    console.log("### chats => ", chats);
    chats?.forEach((chat) => {
      if (!channels.find((channel) => channel.channelId !== chat.channelId)) {
        console.log("### here???");
        setChannels((prev) =>
          prev.concat([
            {
              channelId: chat.channelId,
              lastMessage: chat.chat[chat.chat.length - 1].message,
              lastUpdatedAt: chat.chat[chat.chat.length - 1].createAt,
              newChatCount: chat.chat.filter(
                (item) =>
                  item.userId !== parseInt(session?.activeChildId as string) &&
                  !item.isRead
              ).length,
            },
          ])
        );
      }
    });
  }, [chats]);

  useEffect(() => {
    console.log("### channels => ", channels);
  }, [channels]);

  useEffect(() => {
    if (isSuccess) {
      data.forEach((item) => {
        const channel = channels.find(
          (item2) => item2.channelId === item.channelId
        );
        if (!channel?.partner) {
          setChannels(
            channels.map((item2) => {
              if (item2.channelId === item.channelId) {
                return {
                  ...item2,
                  createBy: item.createBy,
                  createById: item.createById,
                  createForId: item.createForId,
                  createFor: item.createFor,
                  partner: item.partner,
                };
              } else {
                return item2;
              }
            })
          );
        }
      });
    }
  }, [data, isSuccess]);

  // useEffect(() => {
  //   console.log("### chats => ", chats);
  // }, [chats]);

  return (
    <Layout hasGnbMenu headerProps={{ left: "childSelector" }}>
      <div className="flex flex-col gap-2 h-full">
        <Box>
          <div className="flex flex-col space-y-3 divide-y">
            {channels
              .filter((chat) => chat.partner)
              .map((chat) => (
                <Channel key={chat.channelId} chat={chat} />
              ))}
          </div>
        </Box>
      </div>
    </Layout>
  );
};

export default Chat;
