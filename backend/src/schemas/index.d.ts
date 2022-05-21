import mongoose, { Types } from 'mongoose';

export interface ICost {
  category: string;
  description: string;
  sum: number;
  owner: Types.ObjectId;
}

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  birthday: Date;
  marital_status: 'married' | 'single' | 'divorced' | 'widowed';
  costs: Types.ObjectId[];
}

export const UserSchema: mongoose.Schema<IUser, any, { addCost: (cost_id: string) => void }>;

export const CostSchema: mongoose.Schema<ICost>;
