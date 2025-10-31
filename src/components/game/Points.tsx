"use client";

import { useGameStore } from "@/store/useGameStore";

export default function Points() {
  const points = useGameStore((state) => state.points);

  return (
    <div className="h-full bg-[linear-gradient(135deg,#4ac3af,#7bd8cc)] rounded-4xl drop-shadow-[1px_1px_2px_black] md:drop-shadow-[2px_2px_4px_black] p-2 text-lg md:text-2xl font-semibold font-sans flex flex-col items-center tracking-wide">
      Points
      <span className="my-auto text-3xl md:text-7xl lg:text-8xl">{points}</span>
    </div>
  );
}
