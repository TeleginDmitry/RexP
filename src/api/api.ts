import axios from "axios";

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZUlkIjoyLCJpYXQiOjE3MDQ5NTUzODQsImV4cCI6MTcwNTA0MTc4NH0.yCsFo8sYdjsG7ig_Ahl2hWnmU-k6_9wCccjHJ9u8Ri8`,
  },
});

export default $api;
