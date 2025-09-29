"use client";

import GameMap from "@/components/GameMap";
import ProgressBar from "@/components/ProgressBar";
import { useGameStore } from "@/store/useGameStore";

export default function GamePage() {
  const question = useGameStore((state) => state.question);
  const answer = useGameStore((state) => state.answer);
  const points = useGameStore((state) => state.points);
  const totalPoints = useGameStore((state) => state.totalPoints);
  const distance = useGameStore((state) => state.distance);
  const revealAnswer = useGameStore((state) => state.revealAnswer);

  return (
    <div
      className="h-screen grid grid-rows-[1fr_1fr_4fr_4fr] md:grid-cols-[1fr_4fr_0.5fr] lg:grid-cols-[1fr_4fr_1fr] gap-3 lg:gap-4 p-6 lg:p-8 cursor-default"
      style={{
        gridTemplateAreas: `
        "question question timer"
        "totalPoints answer timer"
        "map map points"
        "map map distance"
        `,
      }}
    >
      <div
        style={{ gridArea: "question" }}
        className="bg-[linear-gradient(175deg,#18838f,#4ab7c3)] rounded-4xl drop-shadow-[2px_2px_4px_black] min-h-[72px] p-2 text-lg lg:text-xl font-semibold font-sans text-center tracking-wide"
      >
        {question}
      </div>
      <div style={{ gridArea: "timer" }}>
        <ProgressBar />
      </div>
      <div
        style={{ gridArea: "totalPoints" }}
        className="bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] rounded-4xl drop-shadow-[2px_2px_4px_black] md:min-h-[64px] lg:min-h-[72px] min-w-[140px] p-0.5 lg:p-1 text-lg lg:text-xl font-semibold font-sans tracking-wide flex flex-col items-center justify-center text-center"
      >
        Total Points
        <span className="text-2xl lg:text-3xl">{totalPoints}</span>
      </div>
      <div
        style={{ gridArea: "answer" }}
        className="bg-[linear-gradient(175deg,#18838f,#4ab7c3)] rounded-4xl drop-shadow-[2px_2px_4px_black] md:p-0 lg:p-2 text-xl lg:text-2xl font-semibold font-sans flex items-center justify-center tracking-wide"
      >
        {revealAnswer && answer}
      </div>
      <div style={{ gridArea: "map" }}>
        <GameMap />
      </div>
      <div
        style={{ gridArea: "points" }}
        className="bg-[linear-gradient(135deg,#4ac3af,#7bd8cc)] rounded-4xl drop-shadow-[2px_2px_4px_black] p-2 text-2xl font-semibold font-sans flex flex-col items-center tracking-wide"
      >
        Points
        <span className="my-auto text-7xl lg:text-8xl">{points}</span>
      </div>
      <div
        style={{ gridArea: "distance" }}
        className="bg-[linear-gradient(135deg,#4ac3af,#7bd8cc)] rounded-4xl drop-shadow-[2px_2px_4px_black] p-2 text-2xl font-semibold font-sans flex flex-col items-center tracking-wide text-center"
      >
        Distance
        <span className="my-auto text-3xl lg:text-4xl">
          {distance === 0 ? "" : `${distance} km`}
        </span>
      </div>
    </div>
  );
}
