"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useGameStore } from "@/store/useGameStore";
import L from "leaflet";
import Link from "next/link";

export default function GameMap() {
  const setNextQuestion = useGameStore((state) => state.setNextQuestion);
  const submitAnswer = useGameStore((state) => state.submitAnswer);
  const revealAnswer = useGameStore((state) => state.revealAnswer);
  const setTimerStops = useGameStore((state) => state.setTimerStops);
  const questionNumber = useGameStore((state) => state.questionNumber);

  const currentQuestion = useGameStore(
    (state) => state.selectedQuestions[state.questionNumber]
  );
  const {
    coordinates: { lat: latAnswer, lng: lngAnswer },
  } = currentQuestion;

  const mapRef = useRef<L.Map | null>(null);
  const markerGuessRef = useRef<L.Marker | null>(null);
  const markerAnswerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    const key = "wjzrcvMblbDm0EMT5nG8";

    const map = L.map("map").setView([20, 10], 2);
    L.tileLayer(
      `https://api.maptiler.com/tiles/satellite-mediumres/{z}/{x}/{y}.png?key=${key}`,
      {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        maxZoom: 13,
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        crossOrigin: true,
      }
    ).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = mapRef.current;
    map.setView([20, 10], 2);

    const redIcon = L.icon({
      iconUrl: "/red-pin.png",
      iconSize: [30, 40],
      iconAnchor: [15, 40],
      popupAnchor: [0, -40],
    });

    function handleClick(e: L.LeafletMouseEvent) {
      const { lat, lng } = e.latlng;

      const markerGuess = L.marker([lat, lng], { icon: redIcon }).addTo(map);
      markerGuessRef.current = markerGuess;

      submitAnswer(lat, lng);
      setTimerStops();
    }

    map.on("click", handleClick);

    return () => {
      map.off("click");
      if (markerGuessRef.current) {
        markerGuessRef.current.remove();
        markerGuessRef.current = null;
      }
    };
  }, [questionNumber]);

  useEffect(() => {
    if (!mapRef.current || !revealAnswer) return;

    const map = mapRef.current;
    map.off("click");

    const greenIcon = L.icon({
      iconUrl: "/green-pin.png",
      iconSize: [30, 40],
      iconAnchor: [15, 40],
      popupAnchor: [0, -40],
    });

    const markerAnswer = L.marker([latAnswer, lngAnswer], {
      icon: greenIcon,
    }).addTo(map);
    markerAnswerRef.current = markerAnswer;

    return () => {
      if (markerAnswerRef.current) {
        markerAnswerRef.current.remove();
        markerAnswerRef.current = null;
      }
    };
  }, [revealAnswer]);

  return (
    <div className="relative w-full h-full">
      {revealAnswer && questionNumber < 9 && (
        <button
          className="w-56 md:w-72 lg:w-1/2 h-10 md:h-12 lg:h-1/7 bg-[linear-gradient(175deg,#18838f,#4ab7c3)] hover:bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] absolute z-1000 right-0 left-0 bottom-7 lg:bottom-6 mx-auto rounded-4xl drop-shadow-[2px_2px_4px_black] p-1 text-xl md:text-2xl lg:text-3xl hover:text-2xl md:hover:text-[1.75rem] lg:hover:text-[2.15rem] font-semibold font-sans tracking-wide flex flex-col items-center justify-center cursor-pointer"
          onClick={setNextQuestion}
        >
          Next Question
        </button>
      )}
      {revealAnswer && questionNumber === 9 && (
        <Link
          href="/results"
          className="w-56 md:w-72 lg:w-1/2 h-10 md:h-12 lg:h-1/7 bg-[linear-gradient(175deg,#18838f,#4ab7c3)] hover:bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] absolute z-1000 right-0 left-0 bottom-7 lg:bottom-6 mx-auto rounded-4xl drop-shadow-[2px_2px_4px_black] p-1 text-xl md:text-2xl lg:text-3xl hover:text-2xl md:hover:text-[1.75rem] lg:hover:text-[2.15rem] font-semibold font-sans tracking-wide flex flex-col items-center justify-center cursor-pointer"
        >
          Review Game
        </Link>
      )}
      <div
        id="map"
        style={{
          height: "100%",
          maxWidth: "100%",
        }}
        className="border-[#4ab7c3] border-4 rounded-xl !cursor-crosshair flex-1"
      />
    </div>
  );
}
