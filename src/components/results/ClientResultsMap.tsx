"use client";

import dynamic from "next/dynamic";

const ResultsMap = dynamic(() => import("@/components/results/ResultsMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-lg text-gray-400">
      Loading map...
    </div>
  ),
});

export default function ClientResultsMap() {
  return (
    <div className="h-full">
      <ResultsMap />
    </div>
  );
}
