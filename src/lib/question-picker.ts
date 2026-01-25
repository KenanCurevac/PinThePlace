import { allQuestions } from "./questions";
import { Question } from "../types/question";

export function getSelectedQuestions(): Question[] {
  const indexArray: number[] = [];

  while (indexArray.length < 10) {
    const randomIndex = Math.floor(Math.random() * 50);

    if (!indexArray.includes(randomIndex)) {
      indexArray.push(randomIndex);
    }
  }

  const pickedQuestions = indexArray.map((index) => allQuestions[index]);

  return pickedQuestions;
}
