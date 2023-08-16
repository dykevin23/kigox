import { storage } from "../../../firebase";
import {
  UploadResult,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

const generateUniqueFileKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const uniqueKey = `${year}${month}${day}_${hours}${minutes}${seconds}`;
  return uniqueKey;
};

export const uploadImageFiles = async (
  files: FileList
): Promise<UploadResult> => {
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, "images");

  const file = files[0];
  const fileRef = ref(imagesRef, generateUniqueFileKey());

  return await uploadBytes(fileRef, file);
};

export const downloadImagesUrl = async (path: string) => {
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, path);

  const result = await getDownloadURL(imagesRef);

  return result;
};

export const deleteFile = async (path: string) => {
  const storageRef = ref(storage);
  const deleteRef = ref(storageRef, path);

  return await deleteObject(deleteRef);
};
