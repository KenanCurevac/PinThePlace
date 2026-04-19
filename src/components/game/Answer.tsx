"use client";

import { useGameState } from "@/hooks/useGameState";
import { useParams } from "next/navigation";

export default function Answer() {
  const params = useParams();
  const gameId = params.gameId;

  const { data, isLoading, isError } = useGameState(gameId as string);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  const answer = data.currentQuestion?.correct?.answer ?? "";

  return (
    <p className="h-full bg-[linear-gradient(175deg,#18838f,#4ab7c3)] rounded-4xl drop-shadow-[1px_1px_2px_black] md:drop-shadow-[2px_2px_4px_black] p-2 min-w-[110px] text-lg md:text-xl lg:text-2xl font-semibold font-sans flex items-center justify-center tracking-wide text-center">
      {answer}
    </p>
  );
}
