import backendAPI from "$/config/backendAPI";
import { CostItemData } from "$/types/costs";

interface Response {
  monthlyCosts: {
    sum: number;
    costs: CostItemData[];
  };
  count: number;
}

const getCosts = async (year: number, month: number): Promise<Response> => {
  const response = await backendAPI.get<Response>(`/api/costs?year=${year}&month=${month}`);

  const { costs } = response.data.monthlyCosts;
  const formattedCosts: CostItemData[] = costs.map((cost: any) => ({
    ...cost,
    createdAt: new Date(cost.createdAt),
    updatedAt: new Date(cost.updatedAt),
  }));

  return {
    monthlyCosts: {
      sum: response.data.monthlyCosts.sum,
      costs: formattedCosts,
    },
    count: response.data.count,
  };
};

export default getCosts;
