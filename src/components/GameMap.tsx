"use client";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

export default function GameMap() {
  useEffect(() => {
    let map: any;

    (async () => {
      const L = await import("leaflet");

      const key = "wjzrcvMblbDm0EMT5nG8";
      map = L.map("map").setView([20, 0], 3);

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
    <div
      id="map"
      style={{
        height: "100%",
        width: "100%",
      }}
    />
  );
}
