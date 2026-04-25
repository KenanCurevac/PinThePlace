"use client";

import { useGameStore } from "@/store/useGameStore";
import { GameState } from "@/types/gameState";

type Props = {
  data: GameState;
};

export default function Answer({ data }: Props) {
  const isCalculating = useGameStore((state) => state.isCalculating);

  const answer =
    isCalculating && !data.currentQuestion?.correct?.answer
      ? "Calculating..."
      : (data.currentQuestion?.correct?.answer ?? "");

  return (
    <p className="h-full bg-[linear-gradient(175deg,#18838f,#4ab7c3)] rounded-4xl drop-shadow-[1px_1px_2px_black] md:drop-shadow-[2px_2px_4px_black] p-2 min-w-[110px] text-lg md:text-xl lg:text-2xl font-semibold font-sans flex items-center justify-center tracking-wide text-center">
      {answer}
    </p>
  );
}
