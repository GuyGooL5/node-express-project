import axios from "axios";

const backendClient = axios.create({
  // baseURL:
  //   process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const addJWTHeader = (token: string) => {
  backendClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeJWTHeader = () => {
  delete backendClient.defaults.headers.common["Authorization"];
};

export interface BackendError {
  error: string;
}

backendClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error.response.data;
  }
);

export default backendClient;
