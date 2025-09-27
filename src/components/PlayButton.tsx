"use client";

import { useGameStore } from "@/store/useGameStore";
import Link from "next/link";

type PlayButtonProps = {
  type: string;
};

export default function PlayButton({ type }: PlayButtonProps) {
  const setNewQuestions = useGameStore((state) => state.setNewQuestions);

  return (
    <Link
      href="/game"
      onClick={setNewQuestions}
      className={`${
        type === "Again" ? "w-96 h-16 mb-6 mx-auto" : "w-56 h-14 my-auto"
      } bg-[linear-gradient(165deg,#18838f,#4ab7c3)] hover:bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] text-black text-2xl hover:text-[1.75rem] font-bold tracking-wider rounded-3xl drop-shadow-[2px_2px_4px_black] cursor-pointer flex justify-center items-center`}
    >
      PLAY{type === "Again" ? " AGAIN" : ""}
    </Link>
  );
}
