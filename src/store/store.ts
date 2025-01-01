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
  setAuthUser: (authUser: User) => void;
  setRemoveUser: () => void;
};

type UserEmailSlice = {
  userEmail: string | null;
  setPasswordUser: (email: string) => void;
  setResetUser: () => void;
};

type navSlice = {
  view: boolean;
  setToggle: () => void;
  setClose: () => void;
};

type StoreType = {} & UserEmailSlice & AuthUserStore & navSlice;

//기본 user
const initalAuthUser = { id: null, nickname: null, email: null, role: null };

//USER EMAIL
const createUserEmailSlice = (
  set: (partial: Partial<UserEmailSlice>) => void
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
  set: (partial: Partial<AuthUserStore>) => void
): AuthUserStore => ({
  login: false,
  authUser: initalAuthUser,
  setAuthUser: ({ id, nickname, email, role }: User) =>
    set({ authUser: { id, nickname, email, role } }),
  setRemoveUser: () => set({ authUser: initalAuthUser }),
});

const navStore = (
  set: (updater: (state: navSlice) => Partial<navSlice>) => void
) => ({
  view: false,
  setToggle: () =>
    set((state) => ({
      view: !state.view,
    })),
  setClose: () =>
    set(() => ({
      view: false,
    })),
});

const useStore = create<StoreType>((set) => ({
  ...authUserStore(set),
  ...createUserEmailSlice(set),
  ...navStore(set),
}));

export default useStore;
