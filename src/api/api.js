import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getRecommendations = (data) => api.post("/software/recommend", data);
