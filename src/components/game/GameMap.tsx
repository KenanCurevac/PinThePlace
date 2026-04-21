"use client";

import useLeafletMap from "@/hooks/useLeafletMap";
import useGuessAnswer from "@/hooks/useGuessAnswer";
import useShowAnswer from "@/hooks/useShowAnswer";
import "leaflet/dist/leaflet.css";
import { useParams } from "next/navigation";
import { useGameState } from "@/hooks/useGameState";
import { useNextQuestion } from "@/hooks/useNextQuestion";
import Link from "next/link";

export default function GameMap() {
  const params = useParams();
  const gameId = params.gameId as string;

  const { data, isLoading, isError } = useGameState(gameId);
  const guessMade = Boolean(data?.currentQuestion?.guess);
  const questionNumber = data?.currentQuestionIndex;

  const nextQuestionMutation = useNextQuestion();

  const handleNextQuestion = () => {
    nextQuestionMutation.mutate(gameId);
  };

  const mapRef = useLeafletMap("map-game", false);
  useGuessAnswer(mapRef);
  useShowAnswer(mapRef);

  return (
    <div className="relative w-full h-full">
      {guessMade && questionNumber < 9 && (
        <button
          onClick={handleNextQuestion}
          disabled={nextQuestionMutation.isPending}
          className="w-56 md:w-72 lg:w-1/2 h-10 md:h-12 lg:h-1/7 bg-[linear-gradient(175deg,#18838f,#4ab7c3)] hover:bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] absolute z-1000 right-0 left-0 bottom-7 lg:bottom-6 mx-auto rounded-4xl drop-shadow-[2px_2px_4px_black] p-1 text-xl md:text-2xl lg:text-3xl hover:text-2xl md:hover:text-[1.75rem] lg:hover:text-[2.15rem] font-semibold font-sans tracking-wide flex flex-col items-center justify-center cursor-pointer"
        >
          {nextQuestionMutation.isPending ? "Loading..." : "Next Question"}
        </button>
      )}
      {guessMade && questionNumber === 9 && (
        <Link
          href={`/results/${gameId}`}
          className="w-56 md:w-72 lg:w-1/2 h-10 md:h-12 lg:h-1/7 bg-[linear-gradient(175deg,#18838f,#4ab7c3)] hover:bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] absolute z-1000 right-0 left-0 bottom-7 lg:bottom-6 mx-auto rounded-4xl drop-shadow-[2px_2px_4px_black] p-1 text-xl md:text-2xl lg:text-3xl hover:text-2xl md:hover:text-[1.75rem] lg:hover:text-[2.15rem] font-semibold font-sans tracking-wide flex flex-col items-center justify-center cursor-pointer"
        >
          Review Game
        </Link>
      )}
      <div
        id="map-game"
        style={{
          height: "100%",
          maxWidth: "100%",
        }}
        className="border-[#4ab7c3] border-4 rounded-xl !cursor-crosshair flex-1"
      />
    </div>
  );
}
