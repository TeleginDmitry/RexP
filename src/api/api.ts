import axios from "axios";

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZUlkIjoyLCJpYXQiOjE3MDUwMjQxMTYsImV4cCI6MTcwNTExMDUxNn0.-INzGfquHOIbyS8UYZVmXnGI3peXp06lGBEMnh419A4`,
  },
});

export default $api;
