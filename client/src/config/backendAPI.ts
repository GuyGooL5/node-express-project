import axios from "axios";

const backendAPI = axios.create({});

export const setJWTHeader = (token: string | null) => {
  if (token) {
    backendAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete backendAPI.defaults.headers.common["Authorization"];
  }
};

export default backendAPI;
