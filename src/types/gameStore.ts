import { Question } from "./question";
import { Review } from "./review";

export type GameStore = {
  selectedQuestions: Question[];
  questionNumber: number;
  points: number;
  totalPoints: number;
  distance: number | null;
  timerStopped: boolean;
  revealAnswer: boolean;
  scrollToNum: null | number;
  review: Review[];
  isCalculating: boolean;
  submitAnswer: (lat: number | null, lng: number | null) => void;
  setNextQuestion: () => void;
  setTimerStopped: (stopped: boolean) => void;
  setScrollTo: (questionNum: number) => void;
  setIsCalculating: (value: boolean) => void;
};
