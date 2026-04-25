"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useGameStore } from "@/store/useGameStore";
import { Results } from "@/types/results";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

type Props = {
  data: Results;
};

export default function Review({ data }: Props) {
  const scrollToNum = useGameStore((state) => state.scrollToNum);

  const questionRef = useRef<(HTMLLIElement | null)[]>([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (scrollToNum === null || scrollToNum === undefined) return;

    questionRef.current[scrollToNum]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [scrollToNum]);

  const results = data.results;

  return (
    <ScrollArea
      type="always"
      className={`${
        isMobile ? "h-auto" : "h-78"
      } xxl:h-[calc(100vh-392px)] w-full mt-8 md:mt-0 rounded-2xl bg-[linear-gradient(165deg,#18838f,#4ab7c3)] font-sans drop-shadow-[2px_2px_4px_black] overflow-visible p-4`}
    >
      <h3 className="mb-4 leading-none text-center text-4xl font-semibold tracking-wide">
        Review
      </h3>
      <ol>
        {results.map((result, i) => {
          const formattedDistance =
            result.distance !== null && result.distance !== undefined
              ? result.distance.toFixed(2)
              : null;

          return (
            <li
              key={i}
              className="bg-[#004551] mb-4 text-3xl p-4 text-white rounded-3xl flex flex-col gap-2"
              ref={(el) => {
                questionRef.current[i] = el;
              }}
            >
              <h4 className="text-center">
                {i + 1}. {result.question}
              </h4>
              <hr className="w-full h-[0.75px] bg-white"></hr>
              <p className="text-center">{result.answer}</p>
              <hr className="w-full h-[0.75px] bg-white"></hr>
              <div className="flex flex-col xs:flex-row md:flex-col lg:flex-row gap-2 items-center xs:items-start md:items-center lg:items-start">
                <div className="w-full xs:w-[48%] text-center">
                  Points: {result.points}
                </div>
                <hr className="w-full h-[0.75px] bg-white xs:hidden md:block lg:hidden"></hr>
                <div className="w-full xs:w-[48%] md:w-full lg:w-[48%] text-center">
                  Distance: {formattedDistance}
                  {formattedDistance ? " km" : "Skipped"}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </ScrollArea>
  );
}
