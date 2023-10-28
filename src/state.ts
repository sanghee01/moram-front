import { atom } from "recoil";

export const userState = atom<any | null>({
  key: "userState",
  default: null,
});
