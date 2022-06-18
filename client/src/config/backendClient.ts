import axios from "axios";

const backendClient = axios.create({
  // baseURL:
  //   process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default backendClient;
