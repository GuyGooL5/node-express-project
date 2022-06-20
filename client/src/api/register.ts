import backendAPI from "$/config/backendAPI";
import { MaritalStatus } from "$/config/constants";

interface RegisterData {
  idNumber: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  maritalStatus: MaritalStatus;
}

export interface RegisterResponse {
  token: string;
  user: {
    idNumber: string;
    firstName: string;
    lastName: string;
    birthday: string;
    maritalStatus: MaritalStatus;
  };
}

const register = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await backendAPI.post("/api/register", data);
  return response.data;
};

export default register;
