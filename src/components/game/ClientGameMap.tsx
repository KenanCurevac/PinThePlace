"use client";

import { GameState } from "@/types/gameState";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

const GameMap = dynamic(() => import("@/components/game/GameMap"), {
  ssr: false,
  loading: () => (
    <section className="[grid-area:map] h-full">
      <Skeleton className="w-full h-full rounded-xl border-4 border-[#4ab7c3]" />
    </section>
  ),
});

type Props = {
  data: GameState;
};

export default function ClientGameMap({ data }: Props) {
  return (
    <div className="h-full">
      <GameMap data={data} />
    </div>
  );
}
