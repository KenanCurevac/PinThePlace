"use client";

import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import useLeafletMap from "@/hooks/useLeafletMap";
import useShowAllAnswers from "@/hooks/useShowAllAnswers";
import "leaflet/dist/leaflet.css";

export default function ResultsMap() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const mapRef = useLeafletMap("map-results", isMobile);
  useShowAllAnswers(mapRef);

  useEffect(() => {
    if (!mapRef.current) return;

    if (isMobile) {
      mapRef.current.dragging.disable();
    } else {
      mapRef.current.dragging.enable();
    }
  }, [isMobile]);

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
