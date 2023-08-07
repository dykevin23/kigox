import { atom } from "recoil";
import { IChild } from "types/userTypes";

export const activeChildAtom = atom<IChild>({
  key: "activeChild",
  default: {
    id: 0,
    userId: 0,
    nickname: "",
    birthday: "",
    gender: "",
    createAt: "",
    updateAt: "",
  },
});
