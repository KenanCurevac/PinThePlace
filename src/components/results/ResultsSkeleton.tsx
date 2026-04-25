"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ResultsSkeleton() {
  return (
    <>
      <div className="[grid-area:logo] flex justify-center items-center">
        <Skeleton className="h-[160px] w-[160px] rounded-xl" />
      </div>

      <div className="[grid-area:message] flex justify-center items-center">
        <Skeleton className="h-16 w-[70%] rounded-xl" />
      </div>

      <div className="[grid-area:points] flex justify-center items-center">
        <Skeleton className="h-[160px] w-[200px] rounded-4xl" />
      </div>

      <div className="[grid-area:map]">
        <Skeleton className="w-full h-full rounded-3xl border-4 border-[#4ab7c3]" />
      </div>

      <div className="[grid-area:review] flex flex-col gap-4">
        <Skeleton className="h-10 w-40 mx-auto rounded-xl" />
        <Skeleton className="h-[300px] w-full rounded-2xl" />
      </div>

      <div className="[grid-area:button] flex justify-center items-center">
        <Skeleton className="h-12 w-48 rounded-2xl" />
      </div>
    </>
  );
}
