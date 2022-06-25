import backendAPI from "$/config/backendAPI";

interface Response {
  result: {
    acknowledged: true;
    deletedCount: number;
  };
}

const deleteCost = async (id: string): Promise<boolean> => {
  const response = await backendAPI.delete<Response>(`/api/costs/${id}`);

  return response.data.result.acknowledged;
};

export default deleteCost;
