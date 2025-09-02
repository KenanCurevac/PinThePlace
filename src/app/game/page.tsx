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
  const setNextQuestion = useGameStore((state) => state.setNextQuestion);
  const setPoints = useGameStore((state) => state.setPoints);

  return (
    <div
      className="h-screen grid grid-rows-[1fr_1fr_4fr_4fr] grid-cols-[1fr_4fr_1fr] gap-4 p-8"
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
        className="bg-[linear-gradient(#4ab7c3,#6dafb8)] rounded-4xl shadow-[3px_4px_6px_rgba(28,117,127)] min-h-[72px] p-2 text-xl font-semibold font-sans text-center tracking-wide"
      >
        {question}
      </div>
      <div style={{ gridArea: "timer" }}>
        <ProgressBar />
      </div>
      <div
        style={{ gridArea: "totalPoints" }}
        className="bg-[linear-gradient(#4ac3af,#90bfb7)] rounded-4xl shadow-[3px_4px_6px_rgba(9,154,130)] p-1 text-xl font-semibold font-sans tracking-wide flex flex-col items-center justify-start"
      >
        Total Points
        <span className="text-3xl">{totalPoints}</span>
      </div>
      <div
        style={{ gridArea: "answer" }}
        className="bg-[linear-gradient(#4ab7c3,#6dafb8)] rounded-4xl shadow-[3px_4px_6px_rgba(28,117,127)] p-2 text-2xl font-semibold font-sans flex items-center justify-center tracking-wide"
      >
        {answer}
      </div>
      <div style={{ gridArea: "map" }}>
        <GameMap />
      </div>
      <div
        style={{ gridArea: "points" }}
        className="bg-[linear-gradient(135deg,#4ac3af,#90bfb7)] rounded-4xl shadow-[4px_6px_6px_rgba(9,154,130)] p-2 text-2xl font-semibold font-sans flex flex-col items-center tracking-wide"
      >
        Points
        <span className="my-auto text-8xl">{points}</span>
      </div>
      <div
        style={{ gridArea: "distance" }}
        className="bg-[linear-gradient(135deg,#4ac3af,#90bfb7)] rounded-4xl shadow-[4px_6px_6px_rgba(9,154,130)] p-2 text-2xl font-semibold font-sans flex flex-col items-center tracking-wide"
      >
        Distance
        <span className="my-auto text-4xl">{distance} km</span>
      </div>
    </div>
  );
}
