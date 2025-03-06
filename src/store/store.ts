import { User, USER_ROLE } from "@/types/auth.type";
import { create } from "zustand";

// 상태 타입 정의
type AuthUserStore = {
  login: boolean;
  authUser: {
    id: number | null;
    nickname: string | null;
    email: string | null;
    role: USER_ROLE | null;
  };
  setAuthUser: (_authUser: User) => void;
  setRemoveUser: () => void;
};

type UserEmailSlice = {
  userEmail: string | null;
  setPasswordUser: (_email: string) => void;
  setResetUser: () => void;
};

type StoreType = {} & UserEmailSlice & AuthUserStore;

//기본 user
const initalAuthUser = { id: null, nickname: null, email: null, role: null };

//USER EMAIL
const createUserEmailSlice = (
  set: (_partial: Partial<UserEmailSlice>) => void
): UserEmailSlice => ({
  userEmail: null,
  setPasswordUser: (email: string) => {
    set({ userEmail: email });
  },
  setResetUser: () => {
    set({ userEmail: null });
  },
});

//AUTH USER
const authUserStore = (
  set: (_partial: Partial<AuthUserStore>) => void
): AuthUserStore => ({
  login: false,
  authUser: initalAuthUser,
  setAuthUser: ({ id, nickname, email, role }: User) =>
    set({ authUser: { id, nickname, email, role } }),
  setRemoveUser: () => set({ authUser: initalAuthUser }),
});

const useStore = create<StoreType>((set) => ({
  ...authUserStore(set),
  ...createUserEmailSlice(set),
}));

export default useStore;
