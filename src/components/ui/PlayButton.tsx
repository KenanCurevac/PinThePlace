"use client";

import { useCreateGame } from "@/hooks/useCreateGame";
import { useRouter } from "next/navigation";

type PlayButtonProps = {
  type: string;
};

export default function PlayButton({ type }: PlayButtonProps) {
  const router = useRouter();
  const createGameMutation = useCreateGame();

  const handleStart = () => {
    createGameMutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log("SUCCESS", data);
        router.push(`/game/${data.gameId}`);
      },
      onError: (error) => {
        console.log("ERROR", error);
      },
    });
  };

  return (
    <button
      onClick={handleStart}
      disabled={createGameMutation.isPending}
      className={`${
        type === "again"
          ? "w-[60vw] sm:w-96 md:w-76 lg:w-96 h-16 mb-5 md:mb-6 md:mt-0 mx-auto"
          : "w-56 md:w-64 lg:w-80 h-14 lg:h-16 my-auto"
      } bg-[linear-gradient(165deg,#18838f,#4ab7c3)] hover:bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] text-black text-2xl hover:text-[1.75rem] font-bold tracking-wider rounded-3xl drop-shadow-[2px_2px_4px_black] cursor-pointer flex justify-center items-center`}
    >
      {createGameMutation.isPending
        ? "Loading..."
        : `PLAY${type === "again" ? " AGAIN" : ""}`}
    </button>
  );
}
