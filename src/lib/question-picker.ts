import { allQuestions } from "./questions";
import { Question } from "./QuestionTypes";

type getSelectedQuestionProps = () => Question[];

export const getSelectedQuestions: getSelectedQuestionProps = () => {
  const indexArray: number[] = [];

  while (indexArray.length < 10) {
    const randomIndex = Math.floor(Math.random() * 50);

    if (!indexArray.includes(randomIndex)) {
      indexArray.push(randomIndex);
    }
  }

  const pickedQuestions = indexArray.map((index) => allQuestions[index]);

  return pickedQuestions;
};
