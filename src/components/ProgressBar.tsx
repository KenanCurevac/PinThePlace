"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface CircularProgressProps {
  value: number;
  renderLabel?: (progress: number) => number | string;
  size?: number;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  progressStrokeWidth?: number;
  shape?: "butt" | "round";
  className?: string;
  progressClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
}

const CircularProgress = ({
  value,
  renderLabel,
  className,
  progressClassName,
  labelClassName,
  showLabel,
  shape = "butt",
  size = 100,
  strokeWidth,
  circleStrokeWidth = 10,
  progressStrokeWidth = 10,
}: CircularProgressProps) => {
  const radius = size / 2 - 10;
  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - value) / 100));
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
          strokeWidth={strokeWidth ?? circleStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className={`stroke-[#014b51] ${className}`}
        />
        <circle
          r={radius}
          cx={size / 1.8}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth ?? progressStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={percentage}
          strokeLinecap={shape}
          className={`stroke-[#4ab7c3] ${progressClassName}`}
        />
      </svg>
      {showLabel && (
        <div
          className={cn(
            "absolute top-16 left-11 flex items-center justify-center text-[#4ab7c3]",
            labelClassName
          )}
        >
          10:00
        </div>
      )}
    </div>
  );
};

export default function ProgressBar() {
  const [progress, setProgress] = useState(100);

  return (
    <div className="max-w-xs mx-auto w-full flex flex-col items-center">
      <CircularProgress
        value={70}
        size={180}
        strokeWidth={20}
        showLabel
        labelClassName="text-4xl font-bold"
      />
    </div>
  );
}
