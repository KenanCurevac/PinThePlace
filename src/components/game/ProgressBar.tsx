"use client";

import { useMediaQuery } from "react-responsive";
import CircularProgress from "./CircularProgress";

export default function ProgressBar() {
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
      <CircularProgress size={size} strokeWidth={20} showLabel={showLabel} />
    </div>
  );
}
