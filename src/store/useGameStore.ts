import { create } from "zustand";
import { GameStore } from "@/types/gameStore";

export const useGameStore = create<GameStore>((set) => {
  return {
    timerStopped: false,
    scrollToNum: null,
    isCalculating: false,

    setTimerStopped: (stopped: boolean) => {
      set({ timerStopped: stopped });
    },

    setScrollTo: (index) => {
      set({ scrollToNum: index });
    },

    setIsCalculating: (value: boolean) => {
      set({ isCalculating: value });
    },
  };
});
