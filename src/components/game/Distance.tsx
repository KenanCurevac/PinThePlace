"use client";

import { useGameState } from "@/hooks/useGameState";
import { useGameStore } from "@/store/useGameStore";
import { useParams } from "next/navigation";

export default function Distance() {
  const params = useParams();
  const gameId = params.gameId;

  const { data, isLoading, isError } = useGameState(gameId as string);

  const questionNumber = useGameStore((state) => state.questionNumber);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  const distance = data.questions?.[questionNumber]?.guess?.distance ?? 0;
  const formattedDistance = distance !== undefined ? distance.toFixed(2) : null;

  return (
    <dl className="h-full bg-[linear-gradient(135deg,#4ac3af,#7bd8cc)] rounded-4xl drop-shadow-[1px_1px_2px_black] md:drop-shadow-[2px_2px_4px_black] p-2 min-h-[92px] text-lg md:text-2xl font-semibold font-sans flex flex-col items-center tracking-wide text-center">
      <dt>Distance</dt>
      <dd className="my-auto text-base md:text-3xl lg:text-4xl">
        {formattedDistance ? `${formattedDistance} km` : ""}
      </dd>
    </dl>
  );
}
