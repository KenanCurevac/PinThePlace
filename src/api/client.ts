import { AppError } from "@/errors/appError";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://pin-the-place-backend.vercel.app/api/",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      return Promise.reject(
        new AppError(
          error.response.data.message || "Error",
          error.response.status,
        ),
      );
    }

    return Promise.reject(error);
  },
);
