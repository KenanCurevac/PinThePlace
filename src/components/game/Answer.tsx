"use client";

import { useGameStore } from "@/store/useGameStore";

export default function Answer() {
  const answer = useGameStore((state) => state.answer);
  const revealAnswer = useGameStore((state) => state.revealAnswer);

  return (
    <div className="bg-[linear-gradient(175deg,#18838f,#4ab7c3)] rounded-4xl drop-shadow-[1px_1px_2px_black] md:drop-shadow-[2px_2px_4px_black] p-2 min-w-[110px] text-lg md:text-xl lg:text-2xl font-semibold font-sans flex items-center justify-center tracking-wide text-center">
      {revealAnswer && answer}
    </div>
  );
}
