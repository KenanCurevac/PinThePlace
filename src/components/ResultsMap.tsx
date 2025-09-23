"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useGameStore } from "@/store/useGameStore";
import { Map, Marker } from "leaflet";

export default function ResultsMap() {
  const [enableMap, setEnableMap] = useState(false);
  const mapRef = useRef<Map | null>(null);
  const review = useGameStore((state) => state.review);
  const setScrollTo = useGameStore((state) => state.setScrollTo);

  useEffect(() => {
    let map: any;

    (async () => {
      const L = await import("leaflet");

      const key = "wjzrcvMblbDm0EMT5nG8";
      map = L.map("resultsMap").setView([20, 10], 2);

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
      setEnableMap((trigger) => !trigger);
    })();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    (async () => {
      const L = await import("leaflet");

      const greenIcon = L.icon({
        iconUrl: "/green-pin.png",
        iconSize: [30, 40],
        iconAnchor: [15, 40],
        popupAnchor: [0, -40],
      });

      for (const question of review) {
        const marker = L.marker(
          [question.coordinates.lat, question.coordinates.lng],
          {
            icon: greenIcon,
          }
        ).addTo(map);

        marker.bindTooltip(`${question.answer}`, {
          permanent: false,
          direction: "top",
          offset: [0, -33],
          className: "marker-tooltip",
        });

        marker.on("click", () => {
          console.log("Marker clicked");
          setScrollTo(question.questionNumber);
        });
      }
    })();

    return () => {};
  }, [enableMap]);

  return (
    <div
      id="resultsMap"
      style={{
        height: "100%",
        maxWidth: "100%",
      }}
      className="rounded-3xl border-[#4ab7c3] border-4"
    ></div>
  );
}
