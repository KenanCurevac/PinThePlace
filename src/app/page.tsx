import PlayButton from "@/components/ui/PlayButton";
import Image from "next/image";
import { Pinyon_Script } from "next/font/google";

const pinyon = Pinyon_Script({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Pin the Place - How Well Do You Know the World?",
  description:
    "Put your world knowledge to the test! Guess locations, earn points, and explore the world!",
  openGraph: {
    title: "Pin the Place - How Well Do You Know the World?",
    description:
      "Challenge yourself on the world map. Guess locations and see how close you get!",
    images: ["/logo-ptp.png"],
  },
};

export default function Home() {
  return (
    <main className="h-[100dvh] bg-[url('/earth-at-night.jpg')] bg-cover bg-center flex flex-col items-center mx-auto">
      <Image
        src="/logo-ptp.png"
        width={647}
        height={630}
        alt="Pin the Place Logo"
        className="w-44 md:w-52 lg:w-60 py-10"
      />
      <PlayButton type="start" />
      <h1
        className={`text-7xl lg:text-8xl text-white mb-20 ${pinyon.className}`}
      >
        Pin the Place
      </h1>
    </main>
  );
}
