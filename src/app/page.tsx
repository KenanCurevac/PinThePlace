import Link from "next/link";

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
          <Link
            href="/game"
            className="w-56 h-14 bg-[linear-gradient(175deg,#18838f,#4ab7c3)] hover:bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] text-black text-2xl hover:text-[1.6rem] font-bold tracking-widest rounded-3xl my-auto flex justify-center items-center"
          >
            PLAY
          </Link>
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
