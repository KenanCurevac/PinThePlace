"use client";

import { useGameState } from "@/hooks/useGameState";
import { useParams } from "next/navigation";

export default function TotalPoints() {
  const params = useParams();
  const gameId = params.gameId;

  const { data, isLoading, isError } = useGameState(gameId as string);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  const totalPoints = data.totalPoints ?? 0;

  return (
    <dl className="bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] rounded-4xl drop-shadow-[1px_1px_2px_black] md:drop-shadow-[2px_2px_4px_black] md:min-h-[64px] lg:min-h-[72px] min-w-[68px] md:min-w-[140px] p-2 lg:p-1 text-base md:text-lg lg:text-xl font-semibold font-sans tracking-wide flex flex-col md:justify-center items-center text-center">
      <dt>Total Points</dt>
      <dd className="text-3xl xs:mt-3 md:mt-0 lg:text-3xl">{totalPoints}</dd>
    </dl>
  );
}
