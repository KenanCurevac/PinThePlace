"use client";

import useLeafletMap from "@/hooks/map/useLeafletMap";
import useGuessAnswer from "@/hooks/game/useGuessAnswer";
import useShowAnswer from "@/hooks/game/useShowAnswer";
import "leaflet/dist/leaflet.css";
import { useParams } from "next/navigation";
import { useNextQuestion } from "@/hooks/api/useNextQuestion";
import { GameState } from "@/types/gameState";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  data: GameState;
};

export default function GameMap({ data }: Props) {
  const params = useParams();
  const gameId = params.gameId as string;
  const router = useRouter();

  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const guessMade = Boolean(data?.currentQuestion?.guess);
  const questionNumber = data?.currentQuestionIndex;

  const nextQuestionMutation = useNextQuestion();

  useEffect(() => {
    setIsLoadingNext(false);
  }, [questionNumber]);

  const handleNextQuestion = () => {
    if (questionNumber < 9) {
      setIsLoadingNext(true);
    } else {
      setIsNavigating(true);
    }

    nextQuestionMutation.mutate(gameId);
  };

  const handleReview = () => {
    setIsNavigating(true);
    router.push(`/results/${gameId}`);
  };

  const mapRef = useLeafletMap("map-game", false);
  useGuessAnswer(mapRef, data);
  useShowAnswer(mapRef, data);

  return (
    <div className="relative w-full h-full">
      {guessMade && questionNumber < 9 && (
        <button
          onClick={handleNextQuestion}
          disabled={isLoadingNext}
          className={`${isLoadingNext ? "text-2xl md:text-[1.75rem] lg:text-[2.15rem]" : "cursor-pointer hover:bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] hover:text-2xl md:hover:text-[1.75rem] lg:hover:text-[2.15rem]"} 
          w-56 md:w-72 lg:w-1/2 h-10 md:h-12 lg:h-1/7 bg-[linear-gradient(175deg,#18838f,#4ab7c3)] absolute z-1000 right-0 left-0 bottom-7 lg:bottom-6 mx-auto rounded-4xl drop-shadow-[2px_2px_4px_black] p-1 text-xl md:text-2xl lg:text-3xl font-semibold font-sans tracking-wide flex flex-col items-center justify-center`}
        >
          {isLoadingNext ? "Next..." : "Next Question"}
        </button>
      )}
      {guessMade && questionNumber === 9 && (
        <button
          onClick={handleReview}
          disabled={isNavigating}
          className={`${isNavigating ? "text-2xl md:text-[1.75rem] lg:text-[2.15rem]" : "cursor-pointer hover:bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] hover:text-2xl md:hover:text-[1.75rem] lg:hover:text-[2.15rem]"}
            w-56 md:w-72 lg:w-1/2 h-10 md:h-12 lg:h-1/7 bg-[linear-gradient(175deg,#18838f,#4ab7c3)] absolute z-1000 right-0 left-0 bottom-7 lg:bottom-6 mx-auto rounded-4xl drop-shadow-[2px_2px_4px_black] p-1 text-xl md:text-2xl lg:text-3xl font-semibold font-sans tracking-wide flex flex-col items-center justify-center`}
        >
          {isNavigating ? "Loading Results..." : "Review Game"}
        </button>
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
