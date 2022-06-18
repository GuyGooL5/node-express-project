import { ObjectId } from 'mongoose';
import { IUserDocument } from './User';
import { CreateDocument, CreateModel } from './util';

export type CostCategory =
  | 'food'
  | 'transport'
  | 'house'
  | 'maintenance'
  | 'other';

  
export interface ICost {
  category: CostCategory;
  description: string;
  price: number;
  owner: ObjectId;
}

export interface ICostQueryHelpers {}

export interface ICostMethodsAndOverrides {
  getOwner(): Promise<IUserDocument>;
}

export interface ICostVirtuals {}

export interface ICostStatics {}

export type ICostDocument = CreateDocument<
  ICost,
  ICostQueryHelpers,
  ICostMethodsAndOverrides,
  ICostVirtuals
>;

export type ICostModel = CreateModel<
  ICost,
  ICostQueryHelpers,
  ICostMethodsAndOverrides,
  ICostVirtuals,
  ICostStatics
>;

declare const Cost: ICostModel;

// @ts-ignore
export = Cost;
