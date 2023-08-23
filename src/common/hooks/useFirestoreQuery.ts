import { useState } from "react";
import { DocumentSnapshot, collection, onSnapshot } from "firebase/firestore";

import { db } from "../../firebase";

const useFirestoreQuery = <T extends { id: string }>(dataPath: string) => {
  const [data, setData] = useState<T[] | null>(null);

  if (!dataPath) return null;

  onSnapshot(collection(db, dataPath), (doc) => {
    const updatedData: T[] = [];

    doc.docs.forEach((doc: DocumentSnapshot) => {
      const item = {
        id: doc.id,
        ...doc.data(),
      } as T;
      updatedData.push(item);
    });

    setData((prevData) => {
      const newData = prevData && prevData.length > 0 ? [...prevData] : [];

      updatedData.forEach((item) => {
        if (!newData.find((existingItem) => existingItem.id === item.id)) {
          newData.push(item);
        }
      });

      return newData;
    });
  });

  return data;
};

export default useFirestoreQuery;
