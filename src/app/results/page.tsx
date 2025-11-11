import PlayButton from "@/components/ui/PlayButton";
import Review from "@/components/results/Review";
import TotalPointsCard from "@/components/results/TotalPointsCard";
import Image from "next/image";
import ClientResultsMap from "@/components/results/ClientResultsMap";

export const metadata = {
  title: "Pin the Place - Results",
  description:
    "View your total score and explore the correct locations revealed on the world map. See how close you came in Pin the Place!",
  openGraph: {
    title: "Pin the Place - Results",
    description:
      "Check your final score and see all the correct answers displayed on the world map in Pin the Place.",
    images: ["/logo-ptp.png"],
  },
};

export default function Results() {
  return (
    <main className="results-grid md:h-screen grid [grid-template-areas:'logo_points'_'message_message'_'button_button'_'map_map'_'review_review'] md:[grid-template-areas:'logo_message_message_points'_'map_map_review_review'_'map_map_button_button'] grid-rows-[1fr_auto_auto_260px_auto] md:grid-rows-[1fr_4fr_0.5fr] grid-cols-[1fr_1fr] md:grid-cols-[auto_2fr_1fr_1fr] gap-8 md:gap-8 p-10 cursor-default">
      <Image
        src="/logo-ptp.png"
        width={647}
        height={630}
        className="[grid-area:logo] h-[160px] justify-self-center self-center md:w-auto object-contain drop-shadow-[2px_2px_4px_black] md:ml-8"
        alt="Pin the Place Logo"
        loading="lazy"
      />
      <h1 className="[grid-area:message] text-7xl md:text-[3.25rem] md1:text-[4.375rem] md2:text-[5.25rem] leading-24 md:leading-15 md1:leading-22 md2:leading-25 text-[#4ab7c3] my-auto font-semibold text-center font-sans">
        Great job Traveler!
      </h1>
      <section className="[grid-area:points]">
        <TotalPointsCard />
      </section>
      <section
        aria-label="Map with Correct Answers"
        className="[grid-area:map]"
      >
        <ClientResultsMap />
      </section>
      <section className="[grid-area:review]">
        <Review />
      </section>
      <section className="[grid-area:button]">
        <PlayButton type="Again" />
      </section>
    </main>
  );
}
