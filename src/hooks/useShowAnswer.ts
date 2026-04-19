import { useEffect, useRef } from "react";
import { MutableRefObject } from "react";
import L from "leaflet";
import { useParams } from "next/navigation";
import { useGameState } from "./useGameState";

export default function useShowAnswer(mapRef: MutableRefObject<L.Map | null>) {
  const params = useParams();
  const gameId = params.gameId as string;

  const { data, isLoading, isError } = useGameState(gameId);
  const guessMade = data?.currentQuestion?.guess?.lat;
  const currentQuestion = data?.currentQuestion;
  const latAnswer = currentQuestion?.correct?.lat;
  const lngAnswer = currentQuestion?.correct?.lng;

  const markerAnswerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current || !data) return;

    const map = mapRef.current;
    map.off("click");

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
  }, [guessMade]);
}
