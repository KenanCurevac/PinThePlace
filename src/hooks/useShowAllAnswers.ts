import { useEffect } from "react";
import { MutableRefObject } from "react";
import L from "leaflet";
import { useGameStore } from "@/store/useGameStore";

export default function useShowAllAnswers(
  mapRef: MutableRefObject<L.Map | null>
) {
  const review = useGameStore((state) => state.review);
  const setScrollTo = useGameStore((state) => state.setScrollTo);

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
}
