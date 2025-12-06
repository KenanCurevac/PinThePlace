import Answer from "@/components/game/Answer";
import ClientGameMap from "@/components/game/ClientGameMap";
import Distance from "@/components/game/Distance";
import Points from "@/components/game/Points";
import ProgressBar from "@/components/game/ProgressBar";
import Question from "@/components/game/Question";
import TotalPoints from "@/components/game/TotalPoints";

export const metadata = {
  title: "Pin the Place - Game",
  description:
    "Guess the correct places on the map, race against time, and score as many points as you can!",
  openGraph: {
    title: "Pin the Place - Game",
    description:
      "Try to guess the locations on the map before the timer runs out!",
    images: ["/logo-ptp.png"],
  },
};

export default function GamePage() {
  return (
    <main className="h-[100dvh] overflow-y-hidden grid [grid-template-areas:'question_question_question_timer'_'totalPoints_answer_points_distance'_'map_map_map_map'] md:[grid-template-areas:'question_question_timer'_'totalPoints_answer_timer'_'map_map_points'_'map_map_distance'] grid-rows-[1fr_1fr_8fr] md:grid-rows-[1fr_1fr_4fr_4fr] grid-cols-[1fr_1fr_1fr_1fr] md:grid-cols-[1fr_4fr_0.5fr] lg:grid-cols-[1fr_4fr_1fr] gap-2 md:gap-3 lg:gap-4 p-2.5 md:p-6 lg:p-8 cursor-default">
      <section className="[grid-area:question] self-center">
        <Question />
      </section>
      <section aria-label="Time Remaining" className="[grid-area:timer]">
        <ProgressBar />
      </section>
      <section className="[grid-area:totalPoints]">
        <TotalPoints />
      </section>
      <section aria-label="Answer" className="[grid-area:answer]">
        <Answer />
      </section>
      <section aria-label="Game Map" className="[grid-area:map] h-full">
        <ClientGameMap />
      </section>
      <section className="[grid-area:points]">
        <Points />
      </section>
      <section className="[grid-area:distance]">
        <Distance />
      </section>
    </main>
  );
}
