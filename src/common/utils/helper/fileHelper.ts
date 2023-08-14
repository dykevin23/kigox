import { storage } from "../../../firebase";
import {
  UploadResult,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export const uploadImageFiles = async (
  files: FileList
): Promise<UploadResult> => {
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, "images");

  const file = files[0];
  const fileRef = ref(imagesRef, file.name);

  return await uploadBytes(fileRef, file);
};

export const downloadImagesUrl = async (path: string) => {
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, path);

  const result = await getDownloadURL(imagesRef);

  return result;
};
