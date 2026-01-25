import { Question } from "./question";
import { Review } from "./review";

export type GameStore = {
  selectedQuestions: Question[];
  questionNumber: number;
  points: number;
  totalPoints: number;
  distance: number | null;
  timerStops: boolean;
  revealAnswer: boolean;
  scrollToNum: null | number;
  review: Review[];
  submitAnswer: (lat: number | null, lng: number | null) => void;
  setNextQuestion: () => void;
  setNewQuestions: () => void;
  setTimerStops: () => void;
  setScrollTo: (questionNum: number) => void;
};
