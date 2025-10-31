import Answer from "@/components/game/Answer";
import ClientGameMap from "@/components/game/ClientGameMap";
import Distance from "@/components/game/Distance";
import Points from "@/components/game/Points";
import ProgressBar from "@/components/game/ProgressBar";
import Question from "@/components/game/Question";
import TotalPoints from "@/components/game/TotalPoints";

export default function GamePage() {
  return (
    <div className="game-grid h-[100dvh] overflow-y-hidden grid [grid-template-areas:'question_question_question_timer'_'totalPoints_answer_points_distance'_'map_map_map_map'] md:[grid-template-areas:'question_question_timer'_'totalPoints_answer_timer'_'map_map_points'_'map_map_distance'] grid-rows-[1fr_1fr_8fr] md:grid-rows-[1fr_1fr_4fr_4fr] grid-cols-[1fr_1fr_1fr_1fr] md:grid-cols-[1fr_4fr_0.5fr] lg:grid-cols-[1fr_4fr_1fr] gap-2 md:gap-3 lg:gap-4 p-2.5 md:p-6 lg:p-8 cursor-default">
      <div className="[grid-area:question] self-center">
        <Question />
      </div>
      <div className="[grid-area:timer]">
        <ProgressBar />
      </div>
      <div className="[grid-area:totalPoints]">
        <TotalPoints />
      </div>
      <div className="[grid-area:answer]">
        <Answer />
      </div>
      <div className="[grid-area:map] h-full">
        <ClientGameMap />
      </div>
      <div className="[grid-area:points]">
        <Points />
      </div>
      <div className="[grid-area:distance]">
        <Distance />
      </div>
    </div>
  );
}
