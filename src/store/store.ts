import { USER_ROLE } from "@/types/auth.type";
import { create } from "zustand";

// 상태 타입 정의
type AuthUserStore = {
  authUser: {
    nickname: string | null;
    email: string | null;
    role: USER_ROLE | null;
  };
  setAuthUser: (authUser: {
    nickname: string;
    email: string;
    role: USER_ROLE;
  }) => void;
  setRemoveUser: () => void;
};

//기본 user
const initalAuthUser = { nickname: null, email: null, role: null };

const useStore = create<AuthUserStore>((set) => ({
  login: false,
  authUser: initalAuthUser,
  setAuthUser: ({ nickname, email, role }) =>
    set({ authUser: { nickname, email, role } }),
  setRemoveUser: () => set({ authUser: initalAuthUser }),
}));

export default useStore;
