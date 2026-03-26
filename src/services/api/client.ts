import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://prueba-tecnica-api-tienda-moviles.onrender.com",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "87909682e6cd74208f41a6ef39fe4191",
  },
});
