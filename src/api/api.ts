import axios from "axios";

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoyLCJpYXQiOjE3MDU5MTc1ODYsImV4cCI6MTcwNjAwMzk4Nn0.tBlL8CX3xREvpWbPCzYXv38rKfmD-1CvRywYF-KV-q0`,
  },
});

export default $api;
