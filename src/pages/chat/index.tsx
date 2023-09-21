import { useQuery } from "react-query";

import { Box, Layout } from "@components/layout";
import { chats } from "@services/chat";
import Channel from "@components/chats/channel";
import { IChannel } from "types/chatTypes";

const Chat = () => {
  const { data: chatList } = useQuery<IChannel[]>("chats", chats);

  return (
    <Layout hasGnbMenu headerProps={{ left: "childSelector" }}>
      <div className="flex flex-col gap-2 h-full">
        <Box>
          <div className="flex flex-col space-y-3 divide-y">
            {chatList
              ?.filter((chat) => chat.lastMessage)
              .map((chat) => <Channel key={chat.id} chat={chat} />)}
          </div>
        </Box>
      </div>
    </Layout>
  );
};

export default Chat;
