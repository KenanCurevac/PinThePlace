import { api } from "./client";

export const createGame = async () => {
  const { data } = await api.post("/game");
  return data;
};

export const getGameQuestions = async (gameId: string) => {
  const { data } = await api.get(`/game/${gameId}/questions`);
  return data;
};
