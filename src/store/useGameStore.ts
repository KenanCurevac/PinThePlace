import { create } from "zustand";
import { questions } from "@/lib/questions";
import { getDistance } from "@/lib/distance-formula";

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
  setNextQuestion: () => void;
  setPoints: (lat: number, lng: number) => void;
  setTimerStops: () => void;
  setRevealAnswer: () => void;
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
  timerStops: false,
  revealAnswer: false,
  review: [
    {
      questionNumber: 1,
      question: "Where is the oldest continuously inhabited city in the world?",
      answer: "Damascus",
      coordinates: { lat: 33.5138, lng: 36.2765 },
      points: 0,
      distance: 2500,
    },
    {
      questionNumber: 2,
      question: "Where is the highest waterfall in the world?",
      answer: "Angel Falls",
      coordinates: { lat: 5.967, lng: -62.536 },
      points: 0,
      distance: 2500,
    },
    {
      questionNumber: 3,
      question: "Where is the largest volcano in the world?",
      answer: "Mauna Loa",
      coordinates: { lat: 19.4756, lng: -155.6082 },
      points: 0,
      distance: 2500,
    },
    {
      questionNumber: 4,
      question: "Where is the deepest ocean trench in the world?",
      answer: "Mariana Trench",
      coordinates: { lat: 11.35, lng: 142.2 },
      points: 0,
      distance: 2500,
    },
    {
      questionNumber: 5,
      question: "Where is the tallest building in the world?",
      answer: "Burj Khalifa",
      coordinates: { lat: 25.1972, lng: 55.2744 },
      points: 0,
      distance: 2500,
    },
    {
      questionNumber: 6,
      question: "What is the highest point on Earth?",
      answer: "Mount Everest",
      coordinates: { lat: 27.9881, lng: 86.925 },
      points: 0,
      distance: 2500,
    },
  ],

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
}));
