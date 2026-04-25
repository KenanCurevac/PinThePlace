"use client";

import { useParams } from "next/navigation";
import { useGameState } from "@/hooks/useGameState";

import Answer from "@/components/game/Answer";
import ClientGameMap from "@/components/game/ClientGameMap";
import Distance from "@/components/game/Distance";
import Points from "@/components/game/Points";
import ProgressBar from "@/components/game/ProgressBar";
import Question from "@/components/game/Question";
import TotalPoints from "@/components/game/TotalPoints";
import GameSkeleton from "@/components/game/GameSkeleton";

export default function GameContainer() {
  const params = useParams();
  const gameId = params.gameId as string;

  const { data, isLoading, isError, refetch } = useGameState(gameId);

  if (isLoading) {
    return <GameSkeleton />;
  }

  if (isError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-red-500 text-xl">
        <p>Something went wrong</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-[#4ab7c3] rounded-xl text-black"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <section className="[grid-area:question] self-center">
        <Question data={data} />
      </section>

      <section aria-label="Time Remaining" className="[grid-area:timer]">
        <ProgressBar data={data} />
      </section>

      <section className="[grid-area:totalPoints]">
        <TotalPoints data={data} />
      </section>

      <section aria-label="Answer" className="[grid-area:answer]">
        <Answer data={data} />
      </section>

      <section aria-label="Game Map" className="[grid-area:map] h-full">
        <ClientGameMap data={data} />
      </section>

      <section className="[grid-area:points]">
        <Points data={data} />
      </section>

      <section className="[grid-area:distance]">
        <Distance data={data} />
      </section>
    </>
  );
}
