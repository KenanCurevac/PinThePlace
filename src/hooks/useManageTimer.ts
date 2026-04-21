import { useGameStore } from "@/store/useGameStore";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useGameState } from "./useGameState";
import { useSubmitGuess } from "./useSubmitGuess";
import { useQueryClient } from "@tanstack/react-query";

const TOTAL_TIME = 100;
const TOTAL_SECONDS = 15;

export default function useManageTimer() {
  const params = useParams();
  const gameId = params.gameId as string;

  const { data } = useGameState(gameId);
  const gameStarted = data?.currentQuestion?.startedAt;
  const questionId = data?.currentQuestion?.questionId;
  const guessMade = data?.currentQuestion?.guess;

  const submitGuessMutation = useSubmitGuess();
  const queryClient = useQueryClient();
  const timerStops = useGameStore((state) => state.timerStops);
  const setTimerStops = useGameStore((state) => state.setTimerStops);

  const timerRef = useRef<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    if (!gameStarted) return;

    const updateTime = () => {
      const startedAt = new Date(gameStarted).getTime();
      const now = Date.now();

      const elapsed = (now - startedAt) / 1000;

      const remaining = Math.min(
        Math.max(TOTAL_TIME - (elapsed / TOTAL_SECONDS) * TOTAL_TIME, 0),
        TOTAL_TIME,
      );

      setTimeLeft(remaining);

      if (remaining === 0 && timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    updateTime();

    timerRef.current = window.setInterval(() => {
      updateTime();
    }, 100);

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [questionId]);

  useEffect(() => {
    if (guessMade && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [guessMade]);

  useEffect(() => {
    if (timeLeft <= 0 && !guessMade) {
      submitGuessMutation.mutate(
        { gameId, questionId, guessLat: null, guessLng: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["gameState", gameId],
            });
          },
        },
      );
    }
  }, [timeLeft]);

  return timeLeft;
}
