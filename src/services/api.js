import axios from "axios";

// during development we normally run a local JSON server on port 3001.
// earlier versions relied on CRA's proxy field, but that was removed so
// we now hard‑code the address here.  You can still override the value by
// setting REACT_APP_API_URL in your environment (useful for production).
// If you ever want to run completely offline, set the env var to an empty
// string and the reducers will fall back to the in‑memory dataset.
const api = axios.create({
  baseURL:
    typeof process.env.REACT_APP_API_URL !== "undefined"
      ? process.env.REACT_APP_API_URL
      : process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : ""
});

export default api;