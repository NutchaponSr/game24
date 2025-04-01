import { create } from "zustand";

type GameStore = {
  isCheat: boolean;
  solutions: string[];
  setIsCheat: (isCheat: boolean) => void;
  setSolutions: (solutions: string[]) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  isCheat: false,
  solutions: [],
  setSolutions: (solutions) => set({ solutions }),
  setIsCheat: (isCheat) => set({ isCheat }),
}));