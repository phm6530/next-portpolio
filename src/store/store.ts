import { create } from "zustand";

interface zustandState {
  imgKey: string | null;
  setImgkey: (key: string) => void;
  removeImgkey: () => void;
}

const useStore = create<zustandState>((set) => ({
  imgKey: null,
  setImgkey: (key) => set({ imgKey: key }),
  removeImgkey: () => set({ imgKey: null }),
}));

export default useStore;
