import { useState } from "react";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { IChat } from "types/chatTypes";
import { convertUtcToDate } from "@common/utils/helper/dateHelper";

interface IChatQuery {
  channelId: string;
  chat: IChat[];
  lastUpdatedAt: string;
}
const useChatQuery = (ids: string[]) => {
  const [result, setResult] = useState<IChatQuery[]>([]);
  if (ids.length === 0) return;

  ids.forEach((id) => {
    const q = query(collection(db, "channel", id, "chat"));

    onSnapshot(q, (querySnapshot) => {
      console.log("### here => ", querySnapshot.docs.length);

      let chats: IChat[] = [];
      querySnapshot.docs.forEach((doc) => {
        const chat = doc.data();
        chats.push({
          id: doc.id,
          userId: chat.userId,
          message: chat.message,
          isRead: chat.isRead,
          createAt: chat.createAt.toDate(),
        });
      });

      if (result.find((item) => item.channelId === id)) {
        const data = result.find((item) => item.channelId === id);
        if (
          data?.lastUpdatedAt !==
          convertUtcToDate(chats[chats.length - 1].createAt, "default")
        ) {
          setResult(
            result.map((item) => {
              if (item.channelId === id) {
                return {
                  ...item,
                  chat: chats,
                  lastUpdatedAt: convertUtcToDate(
                    chats[chats.length - 1].createAt,
                    "default"
                  ) as string,
                };
              } else {
                return item;
              }
            })
          );
        }
      } else {
        setResult(
          result.concat([
            {
              channelId: id,
              chat: chats,
              lastUpdatedAt: convertUtcToDate(
                chats[chats.length - 1].createAt,
                "default"
              ) as string,
            },
          ])
        );
      }
    });
  });

  return result;
};

export default useChatQuery;
