import { create } from "zustand";
import { getSelectedQuestions } from "@/lib/question-picker";
import { getDistance } from "@/lib/distance-formula";
import { Question } from "@/lib/QuestionTypes";

type ReviewType = {
  questionNumber: number;
  question: string;
  answer: string;
  coordinates: { lat: number; lng: number };
  points: number;
  distance: number | null;
};

export type useGameStoreProps = {
  selectedQuestions: Question[];
  questionNumber: number;
  points: number;
  totalPoints: number;
  distance: number | null;
  timerStops: boolean;
  revealAnswer: boolean;
  scrollToNum: null | number;
  review: ReviewType[];
  submitAnswer: (lat: number | null, lng: number | null) => void;
  setNextQuestion: () => void;
  setNewQuestions: () => void;
  setTimerStops: () => void;
  setScrollTo: (questionNum: number) => void;
};

export const useGameStore = create<useGameStoreProps>((set) => {
  return {
    selectedQuestions: getSelectedQuestions(),
    questionNumber: 0,
    points: 0,
    totalPoints: 0,
    distance: null,
    timerStops: false,
    revealAnswer: false,
    scrollToNum: null,
    review: [],

    submitAnswer: (latGuess: number | null, lngGuess: number | null) =>
      set((state: useGameStoreProps) => {
        const currentQuestion = state.selectedQuestions[state.questionNumber];
        const {
          coordinates: { lat: latAnswer, lng: lngAnswer },
        } = currentQuestion;

        const distance =
          latGuess === null || lngGuess === null
            ? null
            : Math.round(
                getDistance(latGuess, lngGuess, latAnswer, lngAnswer) * 100
              ) / 100;

        let newPoints = 0;
        if (distance === null) {
          newPoints = 0;
        } else if (distance < 500) {
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
          review: [
            ...state.review,
            {
              questionNumber: state.questionNumber,
              question: currentQuestion.question,
              answer: currentQuestion.answer,
              coordinates: { lat: latAnswer, lng: lngAnswer },
              points: newPoints,
              distance: distance,
            },
          ],
        };
      }),

    setNextQuestion: () =>
      set((state: useGameStoreProps) => {
        return {
          questionNumber: state.questionNumber + 1,
          points: 0,
          distance: null,
          timerStops: false,
          revealAnswer: false,
        };
      }),

    setNewQuestions: () => {
      set({
        selectedQuestions: getSelectedQuestions(),
        questionNumber: 0,
        points: 0,
        totalPoints: 0,
        distance: null,
        timerStops: false,
        revealAnswer: false,
        scrollToNum: null,
        review: [],
      });
    },

    setTimerStops: () => {
      set({ timerStops: true });
    },

    setScrollTo: (questionNum) => {
      set({ scrollToNum: questionNum });
    },
  };
});
