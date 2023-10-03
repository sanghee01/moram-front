import { atom } from "recoil";

interface User {
  nickname: string;
  email: string;
}
export const userState = atom<User | null>({
  key: "userState",
  default: null,
});
