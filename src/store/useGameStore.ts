import { create } from "zustand";
import { questions } from "@/lib/questions";
import { getDistance } from "@/lib/distance-formula";

export type useGameStoreProps = {
  questionNumber: number;
  question: string;
  answer: string;
  coordinates: { lat: number; lng: number };
  points: number;
  totalPoints: number;
  distance: number;
  mapEnabled: boolean;
  setNextQuestion: () => void;
  setPoints: (lat: number, lng: number) => void;
  setEnableMap: () => void;
  setDisableMap: () => void;
};

export const useGameStore = create<useGameStoreProps>((set) => ({
  questionNumber: 0,
  question: questions[0].question,
  answer: questions[0].answer,
  coordinates: {
    lat: questions[0].coordinates.lat,
    lng: questions[0].coordinates.lng,
  },
  points: 0,
  totalPoints: 0,
  distance: 0,
  mapEnabled: false,

  setNextQuestion: () =>
    set((state: useGameStoreProps) => {
      const nextIndex = state.questionNumber + 1;

      return {
        questionNumber: nextIndex,
        question: questions[nextIndex].question,
        answer: questions[nextIndex].answer,
        coordinates: {
          lat: questions[nextIndex].coordinates.lat,
          lng: questions[nextIndex].coordinates.lng,
        },
        points: 0,
        distance: 0,
      };
    }),

  setPoints: (lat: number, lng: number) =>
    set((state: useGameStoreProps) => {
      const distance =
        Math.round(
          getDistance(lat, lng, state.coordinates.lat, state.coordinates.lng) *
            100
        ) / 100;

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

  setEnableMap: () => {
    set((state: useGameStoreProps) => ({
      mapEnabled: true,
    }));
  },

  setDisableMap: () => {
    set((state: useGameStoreProps) => ({
      mapEnabled: false,
    }));
  },
}));
