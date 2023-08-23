import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

import { db } from "../../firebase";

interface MutateProps {
  dataPath: string;
  data: any;
}

const useFirestoreMutation = () => {
  const [id, setId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSucccess] = useState<boolean>(false);

  const submit = async ({ data, dataPath }: MutateProps) => {
    setIsLoading(true);
    const result = await addDoc(collection(db, dataPath), data);
    if (result) {
      setIsLoading(false);
      setIsSucccess(true);
      setId(result.id);
    }
  };

  return {
    mutateFb: submit,
    id,
    isLoadingFb: isLoading,
    isSuccessFb: isSuccess,
  };
};

export default useFirestoreMutation;
