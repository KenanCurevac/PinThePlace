import { createGame } from "@/api/gameApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateGame = () => {
  return useMutation({
    mutationFn: createGame,
  });
};
