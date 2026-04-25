import useManageTimer from "@/hooks/useManageTimer";
import { GameState } from "@/types/GameState";

type CircularProgressProps = {
  size: number;
  strokeWidth: number;
  showLabel: boolean;
  data: GameState;
};

export default function CircularProgress({
  size,
  strokeWidth,
  showLabel,
  data,
}: CircularProgressProps) {
  const timeLeft = useManageTimer(data);

  const radius = size / 2 - 10;
  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - timeLeft) / 100));
  const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${
    size * 1.25
  }`;

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
        className="relative"
      >
        <circle
          r={radius}
          cx={size / 1.8}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className="stroke-[#014b51]"
        />
        <circle
          r={radius}
          cx={size / 1.8}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={percentage}
          strokeLinecap="butt"
          className="stroke-[#4ab7c3]"
        />
      </svg>
      {showLabel && (
        <div className="absolute top-12 lg:top-16 left-0 right-0 mx-auto w-fit text-[#4ab7c3] text-2xl lg:text-4xl font-bold">
          {Math.floor(timeLeft / 6.666)}:
          {String(Math.floor((timeLeft % 10) * 6)).padStart(2, "0")}
        </div>
      )}
    </div>
  );
}
