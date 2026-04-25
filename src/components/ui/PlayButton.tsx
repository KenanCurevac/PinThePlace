"use client";

import { useCreateGame } from "@/hooks/useCreateGame";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PlayButtonProps = {
  type: string;
};

export default function PlayButton({ type }: PlayButtonProps) {
  const router = useRouter();
  const createGameMutation = useCreateGame();
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);

    createGameMutation.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/game/${data.gameId}`);
      },
    });
  };

  return (
    <button
      onClick={handleStart}
      disabled={isStarting}
      className={`${
        type === "again"
          ? "w-[60vw] sm:w-96 md:w-76 lg:w-96 h-16 mb-5 md:mb-6 md:mt-0 mx-auto"
          : "w-56 md:w-64 lg:w-80 h-14 lg:h-16 my-auto"
      } 
      ${isStarting ? "text-[1.75rem]" : "cursor-pointer hover:bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] hover:text-[1.75rem]"}
      bg-[linear-gradient(165deg,#18838f,#4ab7c3)] text-black text-2xl font-bold tracking-wider rounded-3xl drop-shadow-[2px_2px_4px_black] flex justify-center items-center`}
    >
      {isStarting ? "Starting..." : `PLAY${type === "again" ? " AGAIN" : ""}`}
    </button>
  );
}
