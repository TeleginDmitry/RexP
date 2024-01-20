import axios from "axios";

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoyLCJpYXQiOjE3MDU3MzYwOTgsImV4cCI6MTcwNTgyMjQ5OH0.dtNynPBA4PpxtcQFMeaEIUhCIDLW4nHFj9Asg8H00XY`,
  },
});

export default $api;
console.log(process.env.NEXT_PUBLIC_API_URL);
