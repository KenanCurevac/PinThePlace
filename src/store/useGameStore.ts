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
  distance: number | string;
};

export type useGameStoreProps = {
  selectedQuestions: Question[];
  questionNumber: number;
  question: string;
  answer: string;
  coordinates: { lat: number; lng: number };
  points: number;
  totalPoints: number;
  distance: number | string;
  timerStops: boolean;
  revealAnswer: boolean;
  review: ReviewType[];
  scrollTo: null | number;
  setNextQuestion: () => void;
  setPoints: (lat: number, lng: number) => void;
  setTimerStops: () => void;
  setRevealAnswer: (response: string) => void;
  setScrollTo: (questionNum: number) => void;
  setNewQuestions: () => void;
};

export const useGameStore = create<useGameStoreProps>((set) => {
  const initialQuestion = getSelectedQuestions();

  return {
    selectedQuestions: initialQuestion,
    questionNumber: 0,
    question: initialQuestion[0].question,
    answer: initialQuestion[0].answer,
    coordinates: {
      lat: initialQuestion[0].coordinates.lat,
      lng: initialQuestion[0].coordinates.lng,
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
          question: state.selectedQuestions[nextIndex].question,
          answer: state.selectedQuestions[nextIndex].answer,
          coordinates: {
            lat: state.selectedQuestions[nextIndex].coordinates.lat,
            lng: state.selectedQuestions[nextIndex].coordinates.lng,
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
            getDistance(
              lat,
              lng,
              state.coordinates.lat,
              state.coordinates.lng
            ) * 100
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

    setRevealAnswer: (response: string) => {
      set((state: useGameStoreProps) => {
        return {
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
              distance: response === "Skipped" ? "Skipped" : state.distance,
            },
          ],
        };
      });
    },

    setScrollTo: (questionNum) => {
      set((state) => ({ scrollTo: questionNum }));
    },

    setNewQuestions: () => {
      set((state) => {
        const newQuestions = getSelectedQuestions();

        return {
          selectedQuestions: newQuestions,
          questionNumber: 0,
          question: newQuestions[0].question,
          answer: newQuestions[0].answer,
          coordinates: {
            lat: newQuestions[0].coordinates.lat,
            lng: newQuestions[0].coordinates.lng,
          },
          points: 0,
          totalPoints: 0,
          distance: 0,
          timerStops: false,
          revealAnswer: false,
          scrollTo: null,
          review: [],
        };
      });
    },
  };
});
