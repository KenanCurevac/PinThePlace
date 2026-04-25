import { useEffect } from "react";
import { MutableRefObject } from "react";
import L from "leaflet";
import { useGameStore } from "@/store/useGameStore";
import { Results } from "@/types/results";

export default function useCorrectAnswers(
  mapRef: MutableRefObject<L.Map | null>,
  data: Results,
) {
  const setScrollTo = useGameStore((state) => state.setScrollTo);

  useEffect(() => {
    if (!mapRef.current || !data) return;

    const map = mapRef.current;

    const greenIcon = L.icon({
      iconUrl: "/green-pin.png",
      iconSize: [30, 40],
      iconAnchor: [15, 40],
      popupAnchor: [0, -40],
    });

    const markers: L.Marker[] = [];

    data.results.forEach((result, index) => {
      const marker: L.Marker = L.marker(
        [result.answerCoords.latAnswer, result.answerCoords.lngAnswer],
        {
          icon: greenIcon,
        },
      ).addTo(map);

      markers.push(marker);

      marker.bindTooltip(`${result.answer}`, {
        permanent: false,
        direction: "top",
        offset: [0, -33],
        className: "marker-tooltip",
      });

      marker.on("click", () => {
        setScrollTo(index);
      });
    });

    return () => {
      markers.forEach((marker) => {
        marker.off();
        marker.remove();
      });
    };
  }, [data]);
}
