import { getGameResult, getGameState } from "@/api/gameApi";
import { useQuery } from "@tanstack/react-query";

type Result = {
  question: string;
  answer: string;
  distance: number | null;
  points: number;
  answerCoords: {
    latAnswer: number;
    lngAnswer: number;
  };
};

type GetResultsResponse = {
  results: Result[];
  totalPoints: number;
};

export const useGetResult = (gameId: string) => {
  return useQuery<GetResultsResponse>({
    queryKey: ["gameResult", gameId],
    queryFn: () => getGameResult(gameId),
    enabled: !!gameId,
  });
};
