"use client";

import dynamic from "next/dynamic";

const GameMap = dynamic(() => import("@/components/game/GameMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-lg text-gray-400">
      Loading map...
    </div>
  ),
});

export default function ClientGameMap() {
  return (
    <div className="h-full">
      <GameMap />
    </div>
  );
}
