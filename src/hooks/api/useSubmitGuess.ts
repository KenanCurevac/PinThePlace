import { submitGuess } from "@/api/gameApi";
import { useMutation } from "@tanstack/react-query";

export const useSubmitGuess = () => {
  return useMutation({
    mutationFn: submitGuess,
  });
};
