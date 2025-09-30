import PlayButton from "@/components/PlayButton";
import Image from "next/image";
import { Pinyon_Script } from "next/font/google";

const pinyon = Pinyon_Script({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <div className="h-[100dvh] bg-[url('/earth-at-night.jpg')] bg-cover bg-center ">
      <div className="flex flex-col items-center mx-auto h-screen">
        <Image
          src="/logo-ptp.png"
          width={647}
          height={630}
          alt="Pin the Place Logo"
          className="w-44 md:w-52 lg:w-60 py-10"
        />
        <PlayButton type="First" />
        <div
          className={`text-7xl lg:text-8xl text-white mb-20 ${pinyon.className}`}
        >
          Pin the Place
        </div>
      </div>
    </div>
  );
}
