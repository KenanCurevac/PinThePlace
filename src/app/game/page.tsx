import Answer from "@/components/game/Answer";
import Distance from "@/components/game/Distance";
import GameMap from "@/components/game/GameMap";
import Points from "@/components/game/Points";
import ProgressBar from "@/components/game/ProgressBar";
import Question from "@/components/game/Question";
import TotalPoints from "@/components/game/TotalPoints";

export default function GamePage() {
  return (
    <div className="game-grid h-[100dvh] overflow-y-hidden grid [grid-template-areas:'question_question_question_timer'_'totalPoints_answer_points_distance'_'map_map_map_map'] md:[grid-template-areas:'question_question_timer'_'totalPoints_answer_timer'_'map_map_points'_'map_map_distance'] grid-rows-[1fr_1fr_8fr] md:grid-rows-[1fr_1fr_4fr_4fr] grid-cols-[1fr_1fr_1fr_1fr] md:grid-cols-[1fr_4fr_0.5fr] lg:grid-cols-[1fr_4fr_1fr] gap-2 md:gap-3 lg:gap-4 p-2.5 md:p-6 lg:p-8 cursor-default">
      <div style={{ gridArea: "question" }}>
        <Question />
      </div>
      <div style={{ gridArea: "timer" }}>
        <ProgressBar />
      </div>
      <div style={{ gridArea: "totalPoints" }}>
        <TotalPoints />
      </div>
      <div style={{ gridArea: "answer" }}>
        <Answer />{" "}
      </div>
      <div style={{ gridArea: "map" }} className="flex-1 h-full">
        <GameMap />
      </div>
      <div style={{ gridArea: "points" }}>
        <Points />
      </div>
      <div style={{ gridArea: "distance" }}>
        <Distance />
      </div>
    </div>
  );
}
