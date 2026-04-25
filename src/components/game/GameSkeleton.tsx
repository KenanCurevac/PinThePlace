import { Skeleton } from "@/components/ui/skeleton";

export default function GameSkeleton() {
  return (
    <main
      className="h-[100dvh] overflow-y-hidden grid 
    [grid-template-areas:'question_question_question_timer'_'totalPoints_answer_points_distance'_'map_map_map_map'] 
    md:[grid-template-areas:'question_question_timer'_'totalPoints_answer_timer'_'map_map_points'_'map_map_distance'] 
    grid-rows-[1fr_1fr_8fr] md:grid-rows-[1fr_1fr_4fr_4fr] 
    grid-cols-[1fr_1fr_1fr_1fr] md:grid-cols-[1fr_4fr_0.5fr] lg:grid-cols-[1fr_4fr_1fr] 
    gap-2 md:gap-3 lg:gap-4 p-2.5 md:p-6 lg:p-8"
    >
      <section className="[grid-area:question] self-center">
        <Skeleton className="min-h-[72px] w-full rounded-4xl" />
      </section>

      <section className="[grid-area:timer] flex items-center justify-center">
        <Skeleton className="w-[92px] h-[92px] md:w-[140px] md:h-[140px] lg:w-[180px] lg:h-[180px] rounded-full" />
      </section>

      <section className="[grid-area:totalPoints]">
        <Skeleton className="min-w-[68px] md:min-w-[140px] md:min-h-[64px] lg:min-h-[72px] w-full h-full rounded-4xl" />
      </section>

      <section className="[grid-area:answer]">
        <Skeleton className="h-full min-w-[110px] w-full rounded-4xl" />
      </section>

      <section className="[grid-area:map] h-full">
        <Skeleton className="w-full h-full rounded-xl border-4 border-transparent" />
      </section>

      <section className="[grid-area:points]">
        <Skeleton className="h-full w-full rounded-4xl" />
      </section>

      <section className="[grid-area:distance]">
        <Skeleton className="h-full min-h-[92px] w-full rounded-4xl" />
      </section>
    </main>
  );
}
