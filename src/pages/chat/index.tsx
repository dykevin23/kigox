import { useQuery } from "react-query";
import { useRouter } from "next/router";

import { Box, Layout } from "@components/layout";
import { chats } from "@services/chat";
import Channel from "@components/chats/channel";
import { IChannel } from "types/chatTypes";

const Chat = () => {
  const { data: chatList } = useQuery<IChannel[]>("chats", chats);

  const router = useRouter();

  const handleClick = (channelId: string) => {
    router.push(`/chat/${channelId}`);
  };

  return (
    <Layout hasGnbMenu headerProps={{ left: "childSelector" }}>
      <div className="flex flex-col gap-2">
        <Box>
          <div className="flex flex-col space-y-3 divide-y">
            {chatList?.map((chat) => (
              <Channel
                key={chat.id}
                chat={chat}
                onClick={() => handleClick(chat.channelId)}
              />
            ))}
          </div>
        </Box>
      </div>
    </Layout>
  );
};

export default Chat;
