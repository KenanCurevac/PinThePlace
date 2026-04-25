import { useGameStore } from "@/store/useGameStore";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSubmitGuess } from "../api/useSubmitGuess";
import { useQueryClient } from "@tanstack/react-query";
import { GameState } from "@/types/gameState";

const TOTAL_TIME = 100;
const TOTAL_SECONDS = 15;

export default function useManageTimer(data: GameState) {
  const params = useParams();
  const gameId = params.gameId as string;

  const gameStarted = data?.currentQuestion?.startedAt;
  const questionId = data?.currentQuestion?.questionId;
  const guessMade = data?.currentQuestion?.guess;

  const submitGuessMutation = useSubmitGuess();
  const queryClient = useQueryClient();
  const timerStopped = useGameStore((state) => state.timerStopped);
  const setIsCalculating = useGameStore((state) => state.setIsCalculating);

  const timerRef = useRef<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    if (!gameStarted || guessMade) return;

    setIsCalculating(false);

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
    if (timerStopped && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [timerStopped]);

  useEffect(() => {
    if (timeLeft <= 0 && !guessMade) {
      setIsCalculating(true);

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
