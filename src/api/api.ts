import axios from "axios";

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoyLCJpYXQiOjE3MDU4MjI2NTUsImV4cCI6MTcwNTkwOTA1NX0.EPKNwSvMUYy7gse90CAKMzNKRK7eUph7BYRxtjkg5yQ`,
  },
});

export default $api;
