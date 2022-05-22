import { Types, Schema, Model } from 'mongoose';

export interface ICost {
  category: 'food' | 'transport' | 'house' | 'maintenance' | 'other';
  description: string;
  sum: number;
  owner: Types.ObjectId;
}

export interface ICostDocument extends ICost, Document {
  getOwner(): Promise<IUserDocument>;
}

export type ICostSchema = Schema<ICostDocument>;

export interface ICostModel extends Model<ICostDocument> {}

export type CostModel = Model<ICostDocument, ICostModel>;

const Cost: CostModel;

export = Cost;
