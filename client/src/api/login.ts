import backendAPI from "$/config/backendAPI";

export interface LoginResponse {
  token: string;
  user: {
    idNumber: string;
    firstName: string;
    lastName: string;
    birthday: string;
    maritalStatus: MaritalStatus;
  };
}

const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await backendAPI.post("/api/login", { username, password });
  return response.data;
};

export default login;
