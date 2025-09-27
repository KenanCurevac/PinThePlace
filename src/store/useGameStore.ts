import { create } from "zustand";
import { getSelectedQuestions } from "@/lib/question-picker";
import { getDistance } from "@/lib/distance-formula";

const selectedQuestions = getSelectedQuestions();

type ReviewType = {
  questionNumber: number;
  question: string;
  answer: string;
  coordinates: { lat: number; lng: number };
  points: number;
  distance: number;
};

export type useGameStoreProps = {
  questionNumber: number;
  question: string;
  answer: string;
  coordinates: { lat: number; lng: number };
  points: number;
  totalPoints: number;
  distance: number;
  timerStops: boolean;
  revealAnswer: boolean;
  review: ReviewType[];
  scrollTo: null | number;
  setNextQuestion: () => void;
  setPoints: (lat: number, lng: number) => void;
  setTimerStops: () => void;
  setRevealAnswer: () => void;
  setScrollTo: (questionNum: number) => void;
};

export const useGameStore = create<useGameStoreProps>((set) => ({
  questionNumber: 1,
  question: selectedQuestions[0].question,
  answer: selectedQuestions[0].answer,
  coordinates: {
    lat: selectedQuestions[0].coordinates.lat,
    lng: selectedQuestions[0].coordinates.lng,
  },
  points: 0,
  totalPoints: 0,
  distance: 0,
  timerStops: false,
  revealAnswer: false,
  scrollTo: null,
  review: [],

  setNextQuestion: () =>
    set((state: useGameStoreProps) => {
      const nextIndex = state.questionNumber + 1;

      return {
        questionNumber: nextIndex,
        question: selectedQuestions[nextIndex].question,
        answer: selectedQuestions[nextIndex].answer,
        coordinates: {
          lat: selectedQuestions[nextIndex].coordinates.lat,
          lng: selectedQuestions[nextIndex].coordinates.lng,
        },
        points: 0,
        distance: 0,
        timerStops: false,
        revealAnswer: false,
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
        newPoints = 5;
      } else if (distance < 1000) {
        newPoints = 4;
      } else if (distance < 2000) {
        newPoints = 3;
      } else if (distance < 3000) {
        newPoints = 2;
      } else if (distance < 4000) {
        newPoints = 1;
      }

      return {
        points: newPoints,
        totalPoints: state.totalPoints + newPoints,
        distance: distance,
        revealAnswer: true,
      };
    }),

  setTimerStops: () => {
    set((state: useGameStoreProps) => ({
      timerStops: true,
    }));
  },

  setRevealAnswer: () => {
    set((state: useGameStoreProps) => ({
      revealAnswer: true,
      review: [
        ...state.review,
        {
          questionNumber: state.questionNumber,
          question: state.question,
          answer: state.answer,
          coordinates: {
            lat: state.coordinates.lat,
            lng: state.coordinates.lng,
          },
          points: state.points,
          distance: state.distance,
        },
      ],
    }));
  },

  setScrollTo: (questionNum) => {
    set((state) => ({ scrollTo: questionNum }));
  },

  setSelectedQuestions: () => {},
}));
