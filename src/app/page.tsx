import PlayButton from "@/components/PlayButton";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen bg-[url('/earth-at-night.jpg')] bg-cover bg-center ">
        <div className="flex flex-col items-center mx-auto h-screen">
          <img
            src="/logo-ptp.png"
            alt="Pin the Place Logo"
            className="w-44 py-10"
          />
          <PlayButton type="First" />
          <div
            className="text-7xl text-white mb-20"
            style={{ fontFamily: "'Pinyon Script', cursive" }}
          >
            Pin the Place
          </div>
        </div>
      </div>
    </div>
  );
}
