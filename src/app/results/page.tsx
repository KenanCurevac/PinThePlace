import ResultsMap from "@/components/ResultsMap";

export default function Results() {
  return (
    <div
      className="h-screen grid grid-rows-[1fr_3fr] grid-cols-[1fr_2fr_1fr_1fr] gap-8 p-10"
      style={{
        gridTemplateAreas: `"logo message message points" "map map review review"`,
      }}
    >
      <img
        src="/logo-ptp.png"
        className=" h-[185px] object-contain drop-shadow-[2px_2px_4px_black] mx-auto"
        style={{ gridArea: "logo" }}
        alt="Pin the Place Logo"
      />
      <div
        className="text-8xl text-[#4ab7c3] my-auto font-semibold text-center font-sans "
        style={{ gridArea: "message" }}
      >
        Great job, Traveler!
      </div>
      <div
        className="bg-[#4ab7c3] rounded-4xl drop-shadow-[2px_2px_4px_black] text-4xl font-semibold text-center font-sans p-2 text-[#01272d]"
        style={{ gridArea: "points" }}
      >
        Total Points: <span className="text-8xl my-auto ">10</span>
      </div>
      <div style={{ gridArea: "map" }}>
        <ResultsMap />
      </div>
      <div style={{ gridArea: "review" }}>Review</div>
    </div>
  );
}
