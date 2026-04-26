import { useEffect, useRef } from "react";
import { MutableRefObject } from "react";
import L from "leaflet";
import { useGameStore } from "@/store/useGameStore";
import { useParams } from "next/navigation";
import { useSubmitGuess } from "../api/useSubmitGuess";
import { useQueryClient } from "@tanstack/react-query";
import { GameState } from "@/types/gameState";

export default function useGuessAnswer(
  mapRef: MutableRefObject<L.Map | null>,
  data: GameState,
) {
  const params = useParams();
  const gameId = params.gameId as string;

  const questionId = data?.currentQuestion?.questionId;
  const guess = data?.currentQuestion?.guess;

  const submitGuessMutation = useSubmitGuess();
  const queryClient = useQueryClient();
  const setTimerStopped = useGameStore((state) => state.setTimerStopped);
  const setIsCalculating = useGameStore((state) => state.setIsCalculating);

  const markerGuessRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current || !data) {
      return;
    }

    setTimerStopped(false);
    setIsCalculating(false);

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

      const markerGuess = L.marker([lat, lng], { icon: redIcon }).addTo(map);
      markerGuessRef.current = markerGuess;

      setTimerStopped(true);
      setIsCalculating(true);

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

    if (
      !markerGuessRef.current &&
      guess &&
      guess.lat !== null &&
      guess.lng !== null
    ) {
      markerGuessRef.current = L.marker([guess.lat, guess.lng], {
        icon: redIcon,
      }).addTo(map);
    }

    return () => {
      map.off("click");
      if (markerGuessRef.current) {
        markerGuessRef.current.remove();
        markerGuessRef.current = null;
      }
    };
  }, [questionId]);
}
