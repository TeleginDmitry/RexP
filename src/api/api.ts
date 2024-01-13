import axios from "axios";

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoyLCJpYXQiOjE3MDUxMjMwNTIsImV4cCI6MTcwNTIwOTQ1Mn0.awkObKADQUe6U_m6-Cvzk5ZD4jAKOxCjCCEf-RIKIgs`,
  },
});

export default $api;
