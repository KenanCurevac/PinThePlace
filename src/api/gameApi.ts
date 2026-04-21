import { api } from "./client";

export const createGame = async () => {
  const { data } = await api.post("/game");
  return data;
};

export const getGameState = async (gameId: string) => {
  const { data } = await api.get(`/game/${gameId}/state`);
  return data;
};

type SubmitGuessPayload = {
  gameId: string;
  questionId: string;
  guessLat: number | null;
  guessLng: number | null;
};

export const submitGuess = async ({
  gameId,
  questionId,
  guessLat,
  guessLng,
}: SubmitGuessPayload) => {
  const { data } = await api.post(`/game/${gameId}/guesses`, {
    questionId,
    guessLat,
    guessLng,
  });
  return data;
};

export const nextQuestion = async (gameId: string) => {
  const { data } = await api.post(`/game/${gameId}/next`);
  return data;
};

export const getGameResult = async (gameId: string) => {
  const { data } = await api.get(`/game/${gameId}/results`);
  return data;
};
