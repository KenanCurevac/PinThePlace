import { create } from "zustand";
import { getSelectedQuestions } from "@/lib/question-picker";
import { getDistance } from "@/lib/distance-formula";
import { GameStore } from "@/types/gameStore";

export const useGameStore = create<GameStore>((set) => {
  return {
    selectedQuestions: getSelectedQuestions(),
    questionNumber: 0,
    points: 0,
    totalPoints: 0,
    distance: null,
    timerStopped: false,
    revealAnswer: false,
    scrollToNum: null,
    review: [],
    isCalculating: false,

    submitAnswer: (latGuess: number | null, lngGuess: number | null) =>
      set((state: GameStore) => {
        const currentQuestion = state.selectedQuestions[state.questionNumber];
        const {
          coordinates: { lat: latAnswer, lng: lngAnswer },
        } = currentQuestion;

        const distance =
          latGuess === null || lngGuess === null
            ? null
            : Math.round(
                getDistance(latGuess, lngGuess, latAnswer, lngAnswer) * 100,
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
      set((state: GameStore) => {
        return {
          questionNumber: state.questionNumber + 1,
          points: 0,
          distance: null,
          timerStops: false,
          revealAnswer: false,
        };
      }),

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
