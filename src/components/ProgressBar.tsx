"use client";

import { useGameStore } from "@/store/useGameStore";
import { useEffect, useRef, useState } from "react";

interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

const CircularProgress = ({
  size = 100,
  strokeWidth,
}: CircularProgressProps) => {
  const [timeLeft, setTimeLeft] = useState(100);
  const questionNumber = useGameStore((state) => state.questionNumber);
  const timerStops = useGameStore((state) => state.timerStops);
  const setRevealAnswer = useGameStore((state) => state.setRevealAnswer);
  const revealAnswer = useGameStore((state) => state.revealAnswer);

  const timerRef = useRef<number | null>(null);

  const radius = size / 2 - 10;
  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - timeLeft) / 100));
  const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${
    size * 1.25
  }`;

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
    if (timeLeft <= 0 && !revealAnswer) {
      setRevealAnswer("Skipped");
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timerStops && timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [timerStops]);

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
        className="relative"
      >
        <circle
          r={radius}
          cx={size / 1.8}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className="stroke-[#014b51]"
        />
        <circle
          r={radius}
          cx={size / 1.8}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={percentage}
          strokeLinecap="butt"
          className="stroke-[#4ab7c3]"
        />
      </svg>
      <div className="absolute top-16 left-0 right-0 mx-auto w-fit text-[#4ab7c3] text-4xl font-bold">
        {Math.floor(timeLeft / 6.666)}:
        {String(Math.floor((timeLeft % 10) * 6)).padStart(2, "0")}
      </div>
    </div>
  );
};

export default function ProgressBar() {
  return (
    <div className="max-w-xs mx-auto w-full flex flex-col items-center">
      <CircularProgress size={180} strokeWidth={20} showLabel />
    </div>
  );
}
