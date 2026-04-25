import { getGameResult } from "@/api/gameApi";
import { useQuery } from "@tanstack/react-query";

export const useGetResult = (gameId: string) => {
  return useQuery({
    queryKey: ["gameResult", gameId],
    queryFn: () => getGameResult(gameId),
    enabled: !!gameId,
  });
};
