"use client";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { useGameStore } from "@/store/useGameStore";
import L from "leaflet";
import { useMediaQuery } from "react-responsive";
import useLeafletMap from "@/app/hooks/useLeafletMap";

export default function ResultsMap() {
  const review = useGameStore((state) => state.review);
  const setScrollTo = useGameStore((state) => state.setScrollTo);

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const mapRef = useLeafletMap("map-results", isMobile);

  useEffect(() => {
    if (!mapRef.current) return;

    if (isMobile) {
      mapRef.current.dragging.disable();
    } else {
      mapRef.current.dragging.enable();
    }
  }, [isMobile]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const greenIcon = L.icon({
      iconUrl: "/green-pin.png",
      iconSize: [30, 40],
      iconAnchor: [15, 40],
      popupAnchor: [0, -40],
    });

    const markers: L.Marker[] = [];

    for (const question of review) {
      const marker: L.Marker = L.marker(
        [question.coordinates.lat, question.coordinates.lng],
        {
          icon: greenIcon,
        }
      ).addTo(map);

      markers.push(marker);

      marker.bindTooltip(`${question.answer}`, {
        permanent: false,
        direction: "top",
        offset: [0, -33],
        className: "marker-tooltip",
      });

      marker.on("click", () => {
        setScrollTo(question.questionNumber);
      });
    }

    return () => {
      markers.forEach((marker) => {
        marker.off();
        marker.remove();
      });
    };
  }, []);

  return (
    <div
      id="map-results"
      style={{
        height: "100%",
        maxWidth: "100%",
      }}
      className="rounded-3xl border-[#4ab7c3] border-4"
    ></div>
  );
}
