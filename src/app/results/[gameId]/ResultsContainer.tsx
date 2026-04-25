"use client";

import Image from "next/image";

import ClientResultsMap from "@/components/results/ClientResultsMap";
import Review from "@/components/results/Review";
import TotalPointsCard from "@/components/results/TotalPointsCard";
import PlayButton from "@/components/ui/PlayButton";
import { useGetResult } from "@/hooks/useGetResult";
import { useParams } from "next/navigation";
import ResultsSkeleton from "@/components/results/ResultsSkeleton";

export default function ResultsContainer() {
  const params = useParams();
  const gameId = params.gameId as string;

  const { data, isLoading, isError, refetch } = useGetResult(gameId);

  if (isLoading) {
    return <ResultsSkeleton />;
  }

  if (isError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-red-500 text-xl">
        <p>Something went wrong</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-[#4ab7c3] rounded-xl text-black"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Image
        src="/logo-ptp.png"
        width={647}
        height={630}
        className="[grid-area:logo] h-[160px] justify-self-center self-center md:w-auto object-contain drop-shadow-[2px_2px_4px_black] md:ml-8"
        alt="Pin the Place Logo"
        loading="lazy"
      />

      <h1 className="[grid-area:message] text-7xl md:text-[3.25rem] md1:text-[4.375rem] md2:text-[5.25rem] leading-24 md:leading-15 md1:leading-22 md2:leading-25 text-[#4ab7c3] my-auto font-semibold text-center font-sans">
        Great job Traveler!
      </h1>

      <section className="[grid-area:points]">
        <TotalPointsCard data={data} />
      </section>

      <section
        aria-label="Map with Correct Answers"
        className="[grid-area:map]"
      >
        <ClientResultsMap data={data} />
      </section>

      <section className="[grid-area:review]">
        <Review data={data} />
      </section>

      <section className="[grid-area:button]">
        <PlayButton type="again" />
      </section>
    </>
  );
}
