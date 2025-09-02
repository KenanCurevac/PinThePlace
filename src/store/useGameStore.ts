import { create } from "zustand";
import { questions } from "@/lib/questions";
import { getDistance } from "@/lib/distance-formula";

export type useGameStoreProps = {
  questionNumber: number;
  question: string;
  answer: string;
  points: number;
  totalPoints: number;
  distance: number;
  setNextQuestion: () => void;
  setPoints: (lat: number, lng: number) => void;
};

export const useGameStore = create<useGameStoreProps>((set) => ({
  questionNumber: 0,
  question: questions[0].question,
  answer: questions[0].answer,
  points: 0,
  totalPoints: 0,
  distance: 0,

  setNextQuestion: () =>
    set((state: useGameStoreProps) => {
      const nextIndex = state.questionNumber + 1;

      return {
        questionNumber: nextIndex,
        question: questions[nextIndex].question,
        answer: questions[nextIndex].answer,
        distance: 0,
      };
    }),

  setPoints: (lat: number, lng: number) =>
    set((state: useGameStoreProps) => {
      const distance = getDistance(lat, lng, 43.8563, 18.4131);

      let newPoints = 0;
      if (distance < 500) {
        newPoints = 4;
      } else if (distance < 1000) {
        newPoints = 3;
      } else if (distance < 2000) {
        newPoints = 2;
      } else if (distance < 4000) {
        newPoints = 1;
      }

      return {
        points: newPoints,
        totalPoints: state.totalPoints + newPoints,
        distance: distance,
      };
    }),
}));
