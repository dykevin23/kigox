import { atom } from "recoil";
import { IChild } from "types/userTypes";

export const activeChildAtom = atom<IChild>({
  key: "activeChild",
  default: {
    id: 0,
    userId: 0,
    birthday: "",
    gender: "",
    createAt: "",
    updateAt: "",
  },
});
