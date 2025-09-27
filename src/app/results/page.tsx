import ResultsMap from "@/components/ResultsMap";
import Review from "@/components/Review";
import TotalPointsCard from "@/components/TotalPointsCard";

export default function Results() {
  return (
    <div
      className="h-screen grid grid-rows-[1fr_3fr] grid-cols-[auto_2fr_1fr_1fr] gap-8 p-10 cursor-default"
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
        Great job Traveler!
      </div>
      <div style={{ gridArea: "points" }}>
        <TotalPointsCard />
      </div>
      <div style={{ gridArea: "map" }}>
        <ResultsMap />
      </div>
      <div
        style={{ gridArea: "review" }}
        className="flex flex-col justify-between"
      >
        <Review />
        <button className="w-96 h-16 mb-6 bg-[linear-gradient(165deg,#18838f,#4ab7c3)] hover:bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] text-black text-2xl hover:text-[1.75rem] font-bold tracking-wider rounded-3xl mx-auto drop-shadow-[2px_2px_4px_black] cursor-pointer">
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}
