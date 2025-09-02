"use client";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

export default function GameMap() {
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

      map.on("click", (e: any) => {
        const { lat, lng } = e.latlng;
        console.log("Clicked coordinates:", lat, lng);

        L.marker([lat, lng], { icon: redIcon }).addTo(map);
      });
    })();

    return () => {
      if (map) map.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div className="w-1/2 h-1/7 bg-[linear-gradient(#4ab7c3,#6dafb8)] hover:bg-[linear-gradient(#4ac3af,#90bfb7)] absolute z-1000 right-0 left-0 bottom-4 mx-auto rounded-4xl shadow-[4px_6px_6px_rgba(28,117,127)] hover:shadow-[0_0_4px_6px_rgba(9,154,130)] p-1 text-3xl hover:text-[2rem] font-semibold font-sans tracking-wide flex flex-col items-center justify-center">
        Next Question
      </div>
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
