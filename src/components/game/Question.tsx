"use client";

import { getGameQuestions } from "@/api/gameApi";
import { useGameStore } from "@/store/useGameStore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Question() {
  const params = useParams();
  const gameId = params.gameId;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gameQuestions", gameId],
    queryFn: () => getGameQuestions(gameId as string),
    enabled: !!gameId,
  });

  const questionNumber = useGameStore((state) => state.questionNumber);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  const currentQuestion = data.questions?.[questionNumber]?.question;

  if (!currentQuestion) return <p>No question</p>;

  return (
    <h2 className="bg-[linear-gradient(175deg,#18838f,#4ab7c3)] rounded-4xl drop-shadow-[1px_1px_2px_black] md:drop-shadow-[2px_2px_4px_black] min-h-[72px] p-2 text-base md:text-lg lg:text-xl font-semibold font-sans text-center tracking-wide">
      {currentQuestion}
    </h2>
  );
}
