import { create } from "zustand";

export interface SelectedTag {
  tag: string;
  seleted: (tag: string) => void;
}

export const useSelectedTagStore = create<SelectedTag>((set) => ({
  tag: "All",
  seleted: (tag: string) => set({ tag }),
}));
