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
    <div className="game-grid h-[100dvh] overflow-y-hidden grid grid-rows-[1fr_1fr_8fr] md:grid-rows-[1fr_1fr_4fr_4fr] grid-cols-[1fr_1fr_1fr_1fr] md:grid-cols-[1fr_4fr_0.5fr] lg:grid-cols-[1fr_4fr_1fr] gap-3 lg:gap-4 p-4 md:p-6 lg:p-8 cursor-default">
      <div
        style={{ gridArea: "question" }}
        className="bg-[linear-gradient(175deg,#18838f,#4ab7c3)] rounded-4xl drop-shadow-[2px_2px_4px_black] min-h-[72px] p-2 text-base md:text-lg lg:text-xl font-semibold font-sans text-center tracking-wide"
      >
        {question}
      </div>
      <div style={{ gridArea: "timer" }}>
        <ProgressBar />
      </div>
      <div
        style={{ gridArea: "totalPoints" }}
        className="bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] rounded-4xl drop-shadow-[2px_2px_4px_black] md:min-h-[64px] lg:min-h-[72px] min-w-[68px] md:min-w-[140px] p-0.5 lg:p-1 text-base md:text-lg lg:text-xl font-semibold font-sans tracking-wide flex flex-col items-center justify-center text-center"
      >
        Total Points
        <span className="text-2xl lg:text-3xl">{totalPoints}</span>
      </div>
      <div
        style={{ gridArea: "answer" }}
        className="bg-[linear-gradient(175deg,#18838f,#4ab7c3)] rounded-4xl drop-shadow-[2px_2px_4px_black] p-2 min-w-[120px] text-base md:text-xl lg:text-2xl font-semibold font-sans flex items-center justify-center tracking-wide text-center"
      >
        {revealAnswer && answer}
      </div>
      <div style={{ gridArea: "map" }} className="flex-1 h-full">
        <GameMap />
      </div>
      <div
        style={{ gridArea: "points" }}
        className="bg-[linear-gradient(135deg,#4ac3af,#7bd8cc)] rounded-4xl drop-shadow-[2px_2px_4px_black] p-2 text-lg md:text-2xl font-semibold font-sans flex flex-col items-center tracking-wide"
      >
        Points
        <span className="my-auto text-3xl md:text-7xl lg:text-8xl">
          {points}
        </span>
      </div>
      <div
        style={{ gridArea: "distance" }}
        className="bg-[linear-gradient(135deg,#4ac3af,#7bd8cc)] rounded-4xl drop-shadow-[2px_2px_4px_black] p-2 min-h-[92px] text-lg md:text-2xl font-semibold font-sans flex flex-col items-center tracking-wide text-center"
      >
        Distance
        <span className="my-auto text-base md:text-3xl lg:text-4xl">
          {distance === 0 ? "" : `${distance} km`}
        </span>
      </div>

      <style jsx>{`
        .game-grid {
          display: grid;
          grid-template-areas:
            "question question question timer"
            "totalPoints answer points distance"
            "map map map map";
        }

        @media (min-width: 768px) {
          .game-grid {
            grid-template-areas:
              "question question timer"
              "totalPoints answer timer"
              "map map points"
              "map map distance";
          }
        }
      `}</style>
    </div>
  );
}
