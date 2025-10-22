"use client";

import { useGameStore } from "@/store/useGameStore";

export default function TotalPoints() {
  const totalPoints = useGameStore((state) => state.totalPoints);

  return (
    <div className="bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] rounded-4xl drop-shadow-[1px_1px_2px_black] md:drop-shadow-[2px_2px_4px_black] md:min-h-[64px] lg:min-h-[72px] min-w-[68px] md:min-w-[140px] p-2 lg:p-1 text-base md:text-lg lg:text-xl font-semibold font-sans tracking-wide flex flex-col md:justify-center items-center text-center">
      Total Points
      <span className="text-3xl xs:mt-3 md:mt-0 lg:text-3xl">
        {totalPoints}
      </span>
    </div>
  );
}
