"use client";

import { useGameStore } from "@/store/useGameStore";

export default function TotalPointsCard() {
  const totalPoints = useGameStore((state) => state.totalPoints);

  return (
    <div className="h-full max-h-[192px] min-w-[130px] w-[34vw] sm:max-w-[230px] bg-[linear-gradient(135deg,#4ac3af,#7bd8cc)] flex flex-col justify-self-center self-center rounded-4xl drop-shadow-[2px_2px_4px_black] text-3xl sm:text-4xl font-semibold text-center font-sans p-4 text-[#01272d]">
      Total Points:{" "}
      <div className="text-[40px] xs:text-6xl sm:text-7xl my-auto">
        {totalPoints}/50
      </div>
    </div>
  );
}
