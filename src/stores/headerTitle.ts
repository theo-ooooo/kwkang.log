import { create } from "zustand";

export interface HeaderTitleStore {
  title: string;
  isShow: boolean;
  clearTitle: () => void;
  setTitle: (title: string) => void;
  isShowTitle: (isShow: boolean) => void;
}

export const useHeaderTitleStore = create<HeaderTitleStore>((set) => ({
  title: "",
  isShow: false,
  clearTitle: () => set(() => ({ isShow: false, title: "" })),
  setTitle: (title: string) => set((state) => ({ ...state, title })),
  isShowTitle: (isShow) => set((state) => ({ ...state, isShow })),
}));
