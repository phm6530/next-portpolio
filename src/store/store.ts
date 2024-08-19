import { create } from "zustand";

interface zustandState {
  template_key: string | null;
  settemplate_key: (key: string) => void;
  removetemplate_key: () => void;
}

const useStore = create<zustandState>((set) => ({
  template_key: null,
  settemplate_key: (key) => set({ template_key: key }),
  removetemplate_key: () => set({ template_key: null }),
}));

export default useStore;
