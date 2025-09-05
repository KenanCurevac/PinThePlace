"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useGameStore } from "@/store/useGameStore";
import type { Map, Marker } from "leaflet";

export default function GameMap() {
  const mapEnabled = useGameStore((state) => state.mapEnabled);
  const setNextQuestion = useGameStore((state) => state.setNextQuestion);
  const setPoints = useGameStore((state) => state.setPoints);
  const setEnableMap = useGameStore((state) => state.setEnableMap);
  const setDisableMap = useGameStore((state) => state.setDisableMap);
  const distance = useGameStore((state) => state.distance);

  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const [newQuestionTrigger, setNewQuestionTrigger] = useState(false);

  useEffect(() => {
    let map: any;

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
      setEnableMap();
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

      const greenIcon = L.icon({
        iconUrl: "/pin-green.png",
        iconSize: [30, 40],
        iconAnchor: [15, 40],
        popupAnchor: [0, -40],
      });

      const redIcon = L.icon({
        iconUrl: "/pin-red.png",
        iconSize: [30, 40],
        iconAnchor: [15, 40],
        popupAnchor: [0, -40],
      });

      function handleClick(e: any) {
        const { lat, lng } = e.latlng;

        const marker = L.marker([lat, lng], { icon: redIcon }).addTo(map!);
        markerRef.current = marker;
        setPoints(lat, lng);
        map.off("click");
      }

      map.on("click", handleClick);
    })();

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
        console.log("cleanuppp");
      }
    };
  }, [mapEnabled, newQuestionTrigger]);

  return (
    <div className="relative w-full h-full">
      {distance !== 0 && (
        <div
          className="w-1/2 h-1/7 bg-[linear-gradient(#4ab7c3,#6dafb8)] hover:bg-[linear-gradient(#4ac3af,#90bfb7)] absolute z-1000 right-0 left-0 bottom-4 mx-auto rounded-4xl shadow-[4px_6px_6px_rgba(28,117,127)] hover:shadow-[0_0_4px_6px_rgba(9,154,130)] p-1 text-3xl hover:text-[2rem] font-semibold font-sans tracking-wide flex flex-col items-center justify-center"
          onClick={() => {
            setNextQuestion();
            setNewQuestionTrigger((trigger) => !trigger);
          }}
        >
          Next Question
        </div>
      )}
      <div
        id="map"
        style={{
          height: "100%",
          maxWidth: "100%",
        }}
      ></div>
    </div>
  );
}
