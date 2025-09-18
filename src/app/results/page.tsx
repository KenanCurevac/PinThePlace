import ResultsMap from "@/components/ResultsMap";
import Review from "@/components/Review";

export default function Results() {
  return (
    <div
      className="h-screen grid grid-rows-[1fr_3fr] grid-cols-[auto_2fr_1fr_1fr] gap-8 p-10"
      style={{
        gridTemplateAreas: `"logo message message points" "map map review review"`,
      }}
    >
      <img
        src="/logo-ptp.png"
        className=" h-[185px] object-contain drop-shadow-[2px_2px_4px_black] ml-8"
        style={{ gridArea: "logo" }}
        alt="Pin the Place Logo"
      />
      <div
        className="text-8xl text-[#4ab7c3] my-auto font-semibold text-center font-sans"
        style={{ gridArea: "message" }}
      >
        Great job, Traveler!
      </div>
      <div
        className="bg-[linear-gradient(165deg,#18838f,#4ab7c3)] rounded-4xl drop-shadow-[2px_2px_4px_black] text-4xl font-semibold text-center font-sans p-2 text-[#01272d]"
        style={{ gridArea: "points" }}
      >
        Total Points: <span className="text-8xl my-auto ">10</span>
      </div>
      <div style={{ gridArea: "map" }}>
        <ResultsMap />
      </div>
      <div
        style={{ gridArea: "review" }}
        className="flex flex-col justify-between"
      >
        <Review />
        <button className="w-96 h-16 mb-6 bg-[linear-gradient(165deg,#18838f,#4ab7c3)] text-black text-2xl font-bold tracking-wider rounded-3xl mx-auto">
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}
