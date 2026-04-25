export type Results = {
  results: {
    question: string;
    answer: string;
    distance: number;
    points: number;
    answerCoords: {
      latAnswer: number;
      lngAnswer: number;
    };
  }[];
  totalPoints: number;
};
