"use client";

import { GameState } from "@/types/gameState";

type Props = {
  data: GameState;
};

export default function Question({ data }: Props) {
  const currentQuestion = data?.currentQuestion?.question ?? "";

  return (
    <h2 className="bg-[linear-gradient(175deg,#18838f,#4ab7c3)] rounded-4xl drop-shadow-[1px_1px_2px_black] md:drop-shadow-[2px_2px_4px_black] min-h-[72px] p-2 text-base md:text-lg lg:text-xl font-semibold font-sans text-center tracking-wide">
      {currentQuestion}
    </h2>
  );
}
