import backendClient from "$/config/backendClient";

const url = "api/auth";

type ResponseType = { user: any; token: string };

const authUser = async (): Promise<ResponseType> => {
  const response = await backendClient.get(url);
  return response.data;
};

export default authUser;
