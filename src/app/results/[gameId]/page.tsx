import ResultsContainer from "./ResultsContainer";

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
    <main className="md:h-screen grid [grid-template-areas:'logo_points'_'message_message'_'button_button'_'map_map'_'review_review'] md:[grid-template-areas:'logo_message_message_points'_'map_map_review_review'_'map_map_button_button'] grid-rows-[1fr_auto_auto_260px_auto] md:grid-rows-[1fr_4fr_0.5fr] grid-cols-[1fr_1fr] md:grid-cols-[auto_2fr_1fr_1fr] gap-8 md:gap-8 p-10 cursor-default">
      <ResultsContainer />
    </main>
  );
}
