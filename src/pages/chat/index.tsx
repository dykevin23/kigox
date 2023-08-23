import { useEffect } from "react";
import { useQuery } from "react-query";

import { Layout } from "@components/layout";
import { chats } from "@services/chat";

const Chat = () => {
  const { data } = useQuery("chats", chats);

  useEffect(() => {
    console.log("### data => ", data);
  }, [data]);

  return (
    <Layout hasGnbMenu headerProps={{ left: "childSelector" }}>
      <div>Chat</div>
    </Layout>
  );
};

export default Chat;
