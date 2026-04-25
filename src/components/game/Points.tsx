"use client";

import { GameState } from "@/types/gameState";

type Props = {
  data: GameState;
};

export default function Points({ data }: Props) {
  const points = data.currentQuestion?.guess?.points ?? 0;

  return (
    <dl className="h-full bg-[linear-gradient(135deg,#4ac3af,#7bd8cc)] rounded-4xl drop-shadow-[1px_1px_2px_black] md:drop-shadow-[2px_2px_4px_black] p-2 text-lg md:text-2xl font-semibold font-sans flex flex-col items-center tracking-wide">
      <dt>Points</dt>
      <dd className="my-auto text-3xl md:text-7xl lg:text-8xl">{points}</dd>
    </dl>
  );
}
