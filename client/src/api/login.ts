import backendClient from "$/config/backendClient";

const url = "api/login";

type ResponseType = { token: string };

const login = async (
  username: string,
  password: string
): Promise<ResponseType> => {
  const response = await backendClient.post(url, { username, password });
  return response.data;
};

export default login;
