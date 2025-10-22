"use client";

import { useGameStore } from "@/store/useGameStore";

export default function Question() {
  const question = useGameStore((state) => state.question);

  return (
    <div className="bg-[linear-gradient(175deg,#18838f,#4ab7c3)] rounded-4xl drop-shadow-[1px_1px_2px_black] md:drop-shadow-[2px_2px_4px_black] min-h-[72px] p-2 text-base md:text-lg lg:text-xl font-semibold font-sans text-center tracking-wide">
      {question}
    </div>
  );
}
