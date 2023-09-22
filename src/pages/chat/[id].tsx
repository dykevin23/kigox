import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";

import { Layout } from "@components/layout";
import { channel } from "@services/chat";
import { IChannel, IChat } from "types/chatTypes";
import { useFirestoreQuery, useFirestoreMutation } from "@common/hooks";
import { Message, MessageInput } from "@components/common/elements";

const Channel = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [channelId, setChannelId] = useState("");
  const chatList = useFirestoreQuery<IChat>(channelId);
  const { mutateFb } = useFirestoreMutation();

  const { data, isSuccess } = useQuery<IChannel>(
    ["channel", router.query.id],
    () => channel(String(router.query.id)),
    { enabled: Boolean(router.query.id) }
  );

  useEffect(() => {
    if (isSuccess) {
      if (data.id) {
        setChannelId(`channel/${data.channelId}/chat`);
      }
    }
  }, [data, isSuccess]);

  const handleSubmit = (message: string) => {
    mutateFb({
      dataPath: `channel/${router.query.id}/chat`,
      data: {
        message: message.trim(),
        userId: parseInt(session?.activeChildId as string),
        isRead: false,
        createAt: serverTimestamp(),
      },
    });
  };

  return (
    <Layout
      hasGnbMenu={false}
      headerProps={{
        left: "goBack",
      }}
    >
      <div className="flex flex-col h-full bg-slate-200">
        <div className="flex flex-col w-full gap-3 p-2 overflow-y-auto ">
          {chatList?.map((chat) => {
            return (
              <Message
                key={chat.id}
                message={chat.message}
                isRead={chat.isRead}
                reverse={
                  chat.userId === parseInt(session?.activeChildId as string)
                }
                date={chat.createAt}
              />
            );
          })}
        </div>
        <div className="fixed bottom-0 w-full p-2">
          <MessageInput onSubmit={handleSubmit} />
        </div>
      </div>
    </Layout>
  );
};

export default Channel;
