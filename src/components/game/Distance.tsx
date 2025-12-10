"use client";

import { useGameStore } from "@/store/useGameStore";

export default function Distance() {
  const distance = useGameStore((state) => state.distance);

  return (
    <dl className="h-full bg-[linear-gradient(135deg,#4ac3af,#7bd8cc)] rounded-4xl drop-shadow-[1px_1px_2px_black] md:drop-shadow-[2px_2px_4px_black] p-2 min-h-[92px] text-lg md:text-2xl font-semibold font-sans flex flex-col items-center tracking-wide text-center">
      <dt>Distance</dt>
      <dd className="my-auto text-base md:text-3xl lg:text-4xl">
        {distance ? `${distance} km` : ""}
      </dd>
    </dl>
  );
}
