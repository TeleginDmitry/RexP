import axios from "axios";

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoyLCJpYXQiOjE3MDUwNTAyNTcsImV4cCI6MTcwNTEzNjY1N30.uLATLMzjPvzuowM7lnoVe-v16_hnfSiiRvSJkeIqJPw`,
  },
});

export default $api;
