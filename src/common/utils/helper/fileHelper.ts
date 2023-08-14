import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadImageFiles = async (files: FileList): any => {
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, "images");

  const file = files[0];
  const fileRef = ref(imagesRef, file.name);

  try {
    const result = await uploadBytes(fileRef, file);

    return result;
  } catch (error) {
    return error;
  }
};

export const downloadImagesUrl = async (path: string): any => {
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, path);

  const result = await getDownloadURL(imagesRef);

  return result;
};
