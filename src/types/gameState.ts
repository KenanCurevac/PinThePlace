export type Coordinates = {
  lat: number;
  lng: number;
};

export type Correct = {
  answer: string;
  lat: number;
  lng: number;
};

export type Guess = {
  lat: number;
  lng: number;
  distance: number;
  points: number;
};

export type CurrentQuestion = {
  questionId: string;
  question: string;
  startedAt: string;
  guess: Guess | null;
  correct: Correct | null;
};

export type GameState = {
  gameId: string;
  totalPoints: number;
  currentQuestionIndex: number;
  currentQuestion: CurrentQuestion;
};
