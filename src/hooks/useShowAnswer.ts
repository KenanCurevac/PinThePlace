import { useEffect, useRef } from "react";
import { MutableRefObject } from "react";
import L from "leaflet";
import { useGameStore } from "@/store/useGameStore";
import { useParams } from "next/navigation";
import { useGameState } from "./useGameState";

export default function useShowAnswer(mapRef: MutableRefObject<L.Map | null>) {
  const params = useParams();
  const gameId = params.gameId as string;

  const revealAnswer = useGameStore((state) => state.revealAnswer);
  const questionNumber = useGameStore((state) => state.questionNumber);

  const { data } = useGameState(gameId);

  const markerAnswerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current || !revealAnswer) return;

    const map = mapRef.current;
    map.off("click");

    const currentQuestion = data?.questions?.[questionNumber];
    const latAnswer = currentQuestion?.correct?.lat;
    const lngAnswer = currentQuestion?.correct?.lng;

    if (!latAnswer || !lngAnswer) return;

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
  }, [revealAnswer, data]);
}
