"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useGameStore } from "@/store/useGameStore";
import { Map, Marker } from "leaflet";
import Link from "next/link";

export default function GameMap() {
  const setNextQuestion = useGameStore((state) => state.setNextQuestion);
  const setPoints = useGameStore((state) => state.setPoints);
  const revealAnswer = useGameStore((state) => state.revealAnswer);
  const latAnswer = useGameStore((state) => state.coordinates.lat);
  const lngAnswer = useGameStore((state) => state.coordinates.lng);
  const setTimerStops = useGameStore((state) => state.setTimerStops);
  const setRevealAnswer = useGameStore((state) => state.setRevealAnswer);
  const questionNumber = useGameStore((state) => state.questionNumber);

  const mapRef = useRef<Map | null>(null);
  const markerGuessRef = useRef<Marker | null>(null);
  const markerAnswerRef = useRef<Marker | null>(null);
  const [newQuestionTrigger, setNewQuestionTrigger] = useState(false);
  const [mapEnabled, setMapEnabled] = useState(false);

  useEffect(() => {
    let map: import("leaflet").Map;

    (async () => {
      const L = await import("leaflet");

      const key = "wjzrcvMblbDm0EMT5nG8";
      map = L.map("map").setView([20, 10], 2);

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
      setMapEnabled(true);
    })();

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

    (async () => {
      const L = await import("leaflet");

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

        setPoints(lat, lng);
        setTimerStops();
        setRevealAnswer("Answered");
        map.off("click");
      }

      map.setView([20, 10], 2);
      map.on("click", handleClick);
    })();

    return () => {
      if (markerGuessRef.current) {
        markerGuessRef.current.remove();
        markerGuessRef.current = null;
      }
    };
  }, [mapEnabled, newQuestionTrigger]);

  useEffect(() => {
    if (!mapRef.current || !revealAnswer) return;

    const map = mapRef.current;

    (async () => {
      const L = await import("leaflet");

      const greenIcon = L.icon({
        iconUrl: "/green-pin.png",
        iconSize: [30, 40],
        iconAnchor: [15, 40],
        popupAnchor: [0, -40],
      });

      if (revealAnswer) {
        const markerAnswer = L.marker([latAnswer, lngAnswer], {
          icon: greenIcon,
        }).addTo(map);
        markerAnswerRef.current = markerAnswer;
      }
    })();

    return () => {
      if (markerAnswerRef.current) {
        markerAnswerRef.current.remove();
        markerAnswerRef.current = null;
      }
    };
  }, [mapEnabled, revealAnswer]);

  return (
    <div className="relative w-full h-full">
      {revealAnswer && questionNumber < 9 && (
        <div
          className="w-72 lg:w-1/2 h-12 lg:h-1/7 bg-[linear-gradient(175deg,#18838f,#4ab7c3)] hover:bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] absolute z-1000 right-0 left-0 bottom-4 mx-auto rounded-4xl drop-shadow-[2px_2px_4px_black] p-1 text-2xl lg:text-3xl hover:text-[2rem] font-semibold font-sans tracking-wide flex flex-col items-center justify-center cursor-pointer"
          onClick={() => {
            setNextQuestion();
            setNewQuestionTrigger((trigger) => !trigger);
          }}
        >
          Next Question
        </div>
      )}
      {revealAnswer && questionNumber === 9 && (
        <Link
          href="/results"
          className="w-1/2 h-1/7 bg-[linear-gradient(175deg,#18838f,#4ab7c3)] hover:bg-[linear-gradient(175deg,#4ac3af,#7bd8cc)] absolute z-1000 right-0 left-0 bottom-4 mx-auto rounded-4xl drop-shadow-[2px_2px_4px_black] p-1 text-2xl lg:text-3xl hover:text-[2rem] font-semibold font-sans tracking-wide flex flex-col items-center justify-center cursor-pointer"
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
        className="border-[#4ab7c3] border-4 rounded-xl !cursor-crosshair"
      />
    </div>
  );
}
