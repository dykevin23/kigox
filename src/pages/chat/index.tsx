import { Box, Layout } from "@components/layout";
import Channel from "@components/chats/channel";
import useChannelQuery from "@common/hooks/useChannelQuery";
import { useEffect } from "react";

const Chat = () => {
  const channels = useChannelQuery();

  useEffect(() => {
    console.log("### channels => ", channels);
  }, [channels]);

  return (
    <Layout hasGnbMenu headerProps={{ left: "childSelector" }}>
      <div className="flex flex-col gap-2 h-full">
        <Box>
          <div className="flex flex-col space-y-3 divide-y">
            {/* {chatList
              ?.filter((chat) => chat.lastMessage)
              .map((chat) => <Channel key={chat.id} chat={chat} />)} */}
          </div>
        </Box>
      </div>
    </Layout>
  );
};

export default Chat;
