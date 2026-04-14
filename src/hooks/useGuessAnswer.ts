import { useEffect, useRef } from "react";
import { MutableRefObject } from "react";
import L from "leaflet";
import { useGameStore } from "@/store/useGameStore";
import { useParams } from "next/navigation";
import { useSubmitGuess } from "./useSubmitGuess";
import { useQueryClient } from "@tanstack/react-query";

export default function useGuessAnswer(mapRef: MutableRefObject<L.Map | null>) {
  const params = useParams();
  const gameId = params.gameId as string;

  const submitAnswer = useGameStore((state) => state.submitAnswer);
  const questionNumber = useGameStore((state) => state.questionNumber);
  const setTimerStops = useGameStore((state) => state.setTimerStops);

  const submitGuessMutation = useSubmitGuess();
  const queryClient = useQueryClient();

  const markerGuessRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = mapRef.current;
    map.setView([20, 10], 2);

    const redIcon = L.icon({
      iconUrl: "/red-pin.png",
      iconSize: [30, 40],
      iconAnchor: [15, 40],
      popupAnchor: [0, -40],
    });

    function handleClick(e: L.LeafletMouseEvent) {
      const { lat, lng } = e.latlng;

      const state = queryClient.getQueryData<any>(["gameState", gameId]);

      const questionId = state?.questions?.[questionNumber]?.questionId;
      if (!questionId) return;

      const markerGuess = L.marker([lat, lng], { icon: redIcon }).addTo(map);
      markerGuessRef.current = markerGuess;

      submitAnswer(lat, lng);
      setTimerStops();

      submitGuessMutation.mutate(
        { gameId, questionId, guessLat: lat, guessLng: lng },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["gameState", gameId],
            });
          },
        },
      );
    }

    map.on("click", handleClick);

    return () => {
      map.off("click");
      if (markerGuessRef.current) {
        markerGuessRef.current.remove();
        markerGuessRef.current = null;
      }
    };
  }, [questionNumber]);
}
