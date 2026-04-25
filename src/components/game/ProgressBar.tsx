"use client";

import { useMediaQuery } from "react-responsive";
import CircularProgress from "./CircularProgress";
import { GameState } from "@/types/gameState";

type Props = {
  data: GameState;
};

export default function ProgressBar({ data }: Props) {
  const midScreen = useMediaQuery({ minWidth: 768 });
  const largeScreen = useMediaQuery({ minWidth: 1024 });

  const showLabel = midScreen;

  let size = 92;
  if (largeScreen) {
    size = 180;
  } else if (midScreen) {
    size = 140;
  }

  return (
    <div className="max-w-xs mx-auto w-full flex flex-col items-center">
      <CircularProgress
        size={size}
        strokeWidth={20}
        showLabel={showLabel}
        data={data}
      />
    </div>
  );
}
