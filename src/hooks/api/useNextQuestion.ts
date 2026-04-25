import { nextQuestion } from "@/api/gameApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useNextQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: nextQuestion,
    onSuccess: (_, gameId) => {
      queryClient.invalidateQueries({
        queryKey: ["gameState", gameId],
      });
    },
  });
};
