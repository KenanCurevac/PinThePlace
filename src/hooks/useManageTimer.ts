import { useGameStore } from "@/store/useGameStore";
import { useEffect, useRef, useState } from "react";

export default function useManageTimer() {
  const questionNumber = useGameStore((state) => state.questionNumber);
  const timerStops = useGameStore((state) => state.timerStops);
  const submitAnswer = useGameStore((state) => state.submitAnswer);
  const revealAnswer = useGameStore((state) => state.revealAnswer);

  const timerRef = useRef<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(100);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        } else {
          return prevTime - 0.06666;
        }
      });
    }, 10);

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setTimeLeft(100);
    };
  }, [questionNumber]);

  useEffect(() => {
    if (timerStops && timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [timerStops]);

  useEffect(() => {
    if (timeLeft <= 0 && !revealAnswer) {
      submitAnswer(null, null);
    }
  }, [timeLeft]);

  return timeLeft;
}
