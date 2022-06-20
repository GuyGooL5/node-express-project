import backendAPI from "$/config/backendAPI";
import { MaritalStatus } from "$/config/constants";

export interface AuthResponse {
  token: string;
  user: {
    idNumber: string;
    firstName: string;
    lastName: string;
    birthday: string;
    maritalStatus: MaritalStatus;
  };
}

const auth = async (): Promise<AuthResponse> => {
  const response = await backendAPI.get("/api/auth");
  return response.data;
};

export default auth;
