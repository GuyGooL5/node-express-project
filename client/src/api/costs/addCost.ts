import backendAPI from "$/config/backendAPI";
import { CostCategory, CostItemData } from "$/types/costs";

interface Body {
  category: CostCategory;
  price: number;
  description?: string;
}

interface Response {
  cost: CostItemData;
}

const addCost = async (body: Body): Promise<Response> => {
  const response = await backendAPI.post<Response>(`/api/costs`, body);

  const { cost } = response.data;
  const formattedCost: CostItemData = {
    ...cost,
    createdAt: new Date(cost.createdAt),
    updatedAt: new Date(cost.updatedAt),
  };

  return { cost: formattedCost };
};

export default addCost;
