import { create } from "zustand";

export interface HeaderTitleStore {
  title: string;
}

export const useHeaderTitleStore = create<HeaderTitleStore>((set) => ({
  title: "",
  clearTitle: () => set(() => ({ title: "" })),
  setTitle: (title: string) => set(() => ({ title })),
}));
