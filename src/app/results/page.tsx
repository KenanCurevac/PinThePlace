"use client";

import PlayButton from "@/components/PlayButton";
import ResultsMap from "@/components/ResultsMap";
import Review from "@/components/Review";
import TotalPointsCard from "@/components/TotalPointsCard";
import Image from "next/image";

export default function Results() {
  return (
    <div className="results-grid md:h-screen grid grid-rows-[1fr_auto_auto_260px_auto] md:grid-rows-[1fr_4fr_0.5fr] grid-cols-[1fr_1fr] md:grid-cols-[auto_2fr_1fr_1fr] gap-8 md:gap-8 p-10 cursor-default">
      <Image
        src="/logo-ptp.png"
        width={647}
        height={630}
        className=" h-[160px] justify-self-center self-center md:w-auto object-contain drop-shadow-[2px_2px_4px_black] md:ml-8"
        style={{ gridArea: "logo" }}
        alt="Pin the Place Logo"
      />
      <div
        className="text-7xl md:text-[3.25rem] md1:text-[4.375rem] md2:text-[5.25rem] leading-24 md:leading-15 md1:leading-22 md2:leading-25 text-[#4ab7c3] my-auto font-semibold text-center font-sans"
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
      <div style={{ gridArea: "review" }}>
        <Review />
      </div>
      <div style={{ gridArea: "button" }}>
        <PlayButton type="Again" />
      </div>

      <style jsx>
        {`
          .results-grid {
            display: grid;
            grid-template-areas:
              "logo points"
              "message message"
              "button button"
              "map map"
              "review review";
          }

          @media (min-width: 768px) {
            .results-grid {
              grid-template-areas:
                "logo message message points"
                "map map review review"
                "map map button button";
            }
          }
        `}
      </style>
    </div>
  );
}
