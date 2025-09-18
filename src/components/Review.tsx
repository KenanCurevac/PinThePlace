"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useGameStore } from "@/store/useGameStore";

export default function Review() {
  const review = useGameStore((state) => state.review);

  return (
    <ScrollArea className="h-80 w-full rounded-2xl bg-[linear-gradient(165deg,#18838f,#4ab7c3)] font-sans">
      <div className="p-4">
        <h4 className="mb-5 leading-none text-center text-4xl font-semibold tracking-wide">
          Review
        </h4>
        {review.map((question) => {
          console.log(question.question);
          return (
            <div
              key={question.questionNumber}
              className="bg-[#004551] mb-4 text-3xl p-3 text-white rounded-3xl flex flex-col gap-2"
            >
              <div>
                {question.questionNumber}. {question.question}
              </div>
              <div className="w-full h-[0.75px] bg-white"></div>
              <div className="ml-2">{question.answer}</div>
              <div className="w-full h-[0.75px] bg-white"></div>
              <div className="flex justify-around">
                <span>Points: {question.points}</span>
                <span>Distance: {question.distance} km</span>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
