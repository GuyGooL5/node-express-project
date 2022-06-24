export enum CostCategory {
  Food = "food",
  Transport = "transport",
  House = "house",
  Maintenance = "maintenance",
  Other = "other",
}

export interface CostItemData {
  _id: string;
  category: CostCategory;
  description: string;
  price: number;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}
