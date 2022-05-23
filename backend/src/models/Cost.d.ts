import { Types, Schema, Model, Document } from 'mongoose';
import { IUserDocument } from './User';

export type CostCategory = 'food' | 'transport' | 'house' | 'maintenance' | 'other';
export interface ICost {
  category: CostCategory;
  description: string;
  sum: number;
  owner: Types.ObjectId;
}

export type ICostSchema = Schema<ICost>;

export type ICostDocument<T = any, TQueryHelpers = any> = Document<T, TQueryHelpers, ICost>;

export interface ICostQueryHelpers {}

export interface ICostMethodsAndOverrides {
  getOwner(): Promise<IUserDocument>;
}

export interface ICostVirtuals {}

export type ICostModel = Model<ICost, ICostQueryHelpers, ICostMethodsAndOverrides, ICostVirtuals>;

declare const Cost: ICostModel;

// @ts-ignore
export = Cost;
