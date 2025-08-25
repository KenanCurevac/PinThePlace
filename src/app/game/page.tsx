import GameMap from "@/components/GameMap";

export default function GamePage() {
  return (
    <div
      className="h-screen grid grid-rows-[1fr_1fr_4fr_4fr] grid-cols-[1fr_4fr_1fr] gap-4 p-8"
      style={{
        gridTemplateAreas: `
        "question question timer"
        "totalPoints answer timer"
        "map map points"
        "map map distance"
        `,
      }}
    >
      <div
        style={{ gridArea: "question" }}
        className="bg-[linear-gradient(#4ab7c3,#6dafb8)] rounded-4xl shadow-[2px_3px_2px_rgba(28,117,127)]"
      >
        Question
      </div>
      <div style={{ gridArea: "timer" }}>Timer</div>
      <div
        style={{ gridArea: "totalPoints" }}
        className="bg-[linear-gradient(#4ac3af,#90bfb7)] rounded-4xl shadow-[2px_3px_2px_rgba(9,154,130)]"
      >
        Total Points
      </div>
      <div
        style={{ gridArea: "answer" }}
        className="bg-[linear-gradient(#4ab7c3,#6dafb8)] rounded-4xl shadow-[2px_3px_2px_rgba(28,117,127)]"
      >
        Answer
      </div>
      <div style={{ gridArea: "map" }}>
        <GameMap />
      </div>
      <div
        style={{ gridArea: "points" }}
        className="bg-[linear-gradient(135deg,#4ac3af,#90bfb7)] rounded-4xl shadow-[4px_6px_2px_rgba(9,154,130)]"
      >
        Points
      </div>
      <div
        style={{ gridArea: "distance" }}
        className="bg-[linear-gradient(135deg,#4ac3af,#90bfb7)] rounded-4xl shadow-[4px_6px_2px_rgba(9,154,130)]"
      >
        Distance
      </div>
    </div>
  );
}
