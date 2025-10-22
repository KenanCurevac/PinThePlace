"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useGameStore } from "@/store/useGameStore";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

export default function Review() {
  const review = useGameStore((state) => state.review);
  const scrollTo = useGameStore((state) => state.scrollTo);

  const questionRef = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const index = review.findIndex(
      (question) => question.questionNumber === scrollTo
    );

    questionRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [scrollTo]);

  return (
    <ScrollArea
      type="always"
      className={`${
        isMobile ? "100%" : "h-78"
      } xxl:h-[calc(100vh-392px)] w-full mt-8 md:mt-0 rounded-2xl bg-[linear-gradient(165deg,#18838f,#4ab7c3)] font-sans drop-shadow-[2px_2px_4px_black] overflow-visible`}
    >
      <div className="p-4">
        <h4 className="mb-4 leading-none text-center text-4xl font-semibold tracking-wide">
          Review
        </h4>
        {review.map((question, i) => {
          return (
            <div
              key={question.questionNumber}
              className="bg-[#004551] mb-4 text-3xl p-4 text-white rounded-3xl flex flex-col gap-2"
              ref={(el) => {
                questionRef.current[i] = el;
              }}
            >
              <div className="text-center">
                {question.questionNumber + 1}. {question.question}
              </div>
              <div className="w-full h-[0.75px] bg-white"></div>
              <div className="text-center">{question.answer}</div>
              <div className="w-full h-[0.75px] bg-white"></div>
              <div className="flex flex-col xs:flex-row md:flex-col lg:flex-row gap-2 items-center xs:items-start md:items-center lg:items-start">
                <div className="w-full xs:w-[48%] text-center">
                  Points: {question.points}
                </div>
                <div className="w-full h-[0.75px] bg-white xs:hidden md:block lg:hidden"></div>
                <div className="w-full xs:w-[48%] md:w-full lg:w-[48%] text-center">
                  Distance: {question.distance}{" "}
                  {question.distance === "Skipped" ? "" : "km"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
