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
          <button className="w-56 h-14 bg-[linear-gradient(165deg,#014c6a,#005F84)] hover:bg-[linear-gradient(165deg,#377d90,#9ad4e4)] text-[#9ad4e4] hover:text-[#00303a] text-2xl hover:text-[1.7rem] font-bold tracking-widest hover:tracking-[0.25rem] rounded-3xl my-auto hover:shadow-[0_0_4px_6px_#9ad4e4]">
            PLAY
          </button>
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
