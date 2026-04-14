import { getGameState } from "@/api/gameApi";
import { useQuery } from "@tanstack/react-query";

export const useGameState = (gameId: string) => {
  return useQuery({
    queryKey: ["gameState", gameId],
    queryFn: () => getGameState(gameId),
    enabled: !!gameId,
  });
};
