import PlayButton from "@/components/PlayButton";
import ResultsMap from "@/components/ResultsMap";
import Review from "@/components/Review";
import TotalPointsCard from "@/components/TotalPointsCard";
import Image from "next/image";

export default function Results() {
  return (
    <div
      className="h-screen grid grid-rows-[1fr_3fr] grid-cols-[auto_2fr_1fr_1fr] gap-8 p-10 cursor-default"
      style={{
        gridTemplateAreas: `"logo message message points" "map map review review"`,
      }}
    >
      <Image
        src="/logo-ptp.png"
        width={647}
        height={630}
        className=" h-[185px] w-auto object-contain drop-shadow-[2px_2px_4px_black] ml-8"
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
        <PlayButton type="Again" />
      </div>
    </div>
  );
}
