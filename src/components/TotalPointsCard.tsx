"use client";

import { useGameStore } from "@/store/useGameStore";

export default function TotalPointsCard() {
  const totalPoints = useGameStore((state) => state.totalPoints);

  return (
    <div className="h-full bg-[linear-gradient(135deg,#4ac3af,#7bd8cc)] rounded-4xl drop-shadow-[2px_2px_4px_black] text-4xl font-semibold text-center font-sans p-2 text-[#01272d]">
      Total Points: <div className="text-[84px] mt-1">{totalPoints}/50</div>
    </div>
  );
}
