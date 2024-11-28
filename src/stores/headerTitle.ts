import { create } from "zustand";

export interface HeaderTitleStore {
  title: string;
  clearTitle: () => void;
  setTitle: (title: string) => void;
}

export const useHeaderTitleStore = create<HeaderTitleStore>((set) => ({
  title: "",
  clearTitle: () => set(() => ({ title: "" })),
  setTitle: (title: string) => set(() => ({ title })),
}));
