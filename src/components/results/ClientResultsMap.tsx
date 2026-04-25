"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import { Results } from "@/types/results";

const ResultsMap = dynamic(() => import("@/components/results/ResultsMap"), {
  ssr: false,
  loading: () => (
    <section className="[grid-area:map] h-full w-full">
      <Skeleton className="w-full h-full rounded-3xl border-4 border-[#4ab7c3]" />
    </section>
  ),
});

type Props = {
  data: Results;
};

export default function ClientResultsMap({ data }: Props) {
  return (
    <div className="h-full">
      <ResultsMap data={data} />
    </div>
  );
}
