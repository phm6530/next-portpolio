import { USER_ROLE } from "@/types/auth.type";
import { create } from "zustand";

// 상태 타입 정의
type AuthUserStore = {
  authUser: {
    id: number | null;
    nickname: string | null;
    email: string | null;
    role: USER_ROLE | null;
  };
  setAuthUser: (authUser: {
    id: number;
    nickname: string;
    email: string;
    role: USER_ROLE;
  }) => void;
  setRemoveUser: () => void;
  // userDataloading: boolean | null;
};

//기본 user
const initalAuthUser = { id: null, nickname: null, email: null, role: null };

const useStore = create<AuthUserStore>((set) => ({
  login: false,
  authUser: initalAuthUser,
  setAuthUser: ({ id, nickname, email, role }) =>
    set({ authUser: { id, nickname, email, role } }),
  setRemoveUser: () => set({ authUser: initalAuthUser }),
}));

export default useStore;
