import { useState } from "react";
import { useSession } from "next-auth/react";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const useChannelQuery = () => {
  const { data: session } = useSession();
  const [channelIds, setChannelIds] = useState<string[]>([]);
  const q = query(
    collection(db, "channel"),
    where("createById", "==", parseInt(session?.activeChildId as string))
  );

  onSnapshot(q, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      // console.log("### change => ", change, change.doc.id);

      if (change.type === "removed") {
        setChannelIds(channelIds.filter((id) => id !== change.doc.id));
      } else {
        if (!channelIds.includes(change.doc.id)) {
          setChannelIds(channelIds.concat(change.doc.id));
        }
      }
    });
  });

  return channelIds;
};

export default useChannelQuery;
