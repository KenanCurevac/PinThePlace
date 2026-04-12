import { useEffect, useRef } from "react";
import { MutableRefObject } from "react";
import L from "leaflet";
import { useGameStore } from "@/store/useGameStore";

export default function useShowAnswer(mapRef: MutableRefObject<L.Map | null>) {
  const revealAnswer = useGameStore((state) => state.revealAnswer);
  const currentQuestion = useGameStore(
    (state) => state.selectedQuestions[state.questionNumber]
  );
  const {
    coordinates: { lat: latAnswer, lng: lngAnswer },
  } = currentQuestion;

  const markerAnswerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current || !revealAnswer) return;

    const map = mapRef.current;
    map.off("click");

    const greenIcon = L.icon({
      iconUrl: "/green-pin.png",
      iconSize: [30, 40],
      iconAnchor: [15, 40],
      popupAnchor: [0, -40],
    });

    const markerAnswer = L.marker([latAnswer, lngAnswer], {
      icon: greenIcon,
    }).addTo(map);
    markerAnswerRef.current = markerAnswer;

    return () => {
      if (markerAnswerRef.current) {
        markerAnswerRef.current.remove();
        markerAnswerRef.current = null;
      }
    };
  }, [revealAnswer]);
}
