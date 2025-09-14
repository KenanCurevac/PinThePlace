"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useGameStore } from "@/store/useGameStore";
import { Map, Marker } from "leaflet";

export default function ResultsMap() {
  const [enableMap, setEnableMap] = useState(false);
  const mapRef = useRef<Map | null>(null);

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
    })();

    mapRef.current = map;
    setEnableMap((trigger) => !trigger);

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
        iconUrl: "/pin-green.png",
        iconSize: [30, 40],
        iconAnchor: [15, 40],
        popupAnchor: [0, -40],
      });

      //   const markerAnswer = L.marker([latAnswer, lngAnswer], {
      //      icon: greenIcon,
      //   }).addTo(map);
    })();

    return () => {};
  }, [enableMap]);

  return (
    <div
      id="map"
      style={{
        height: "100%",
        maxWidth: "100%",
      }}
    ></div>
  );
}
