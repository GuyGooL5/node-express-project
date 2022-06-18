import { ObjectId } from 'mongoose';
export { MonthCostSchema } from './MonthCost';
import { CreateDocument, CreateModel } from './util';

export interface IMonthCost {
  sum: number;
  costs: ObjectId[];
}
interface IMonthCostQueryHelpers {}

interface IMonthCostMethodsAndOverrides {}

export interface IMonthCostVirtuals {}

export interface IMonthCostStatics {}

export type IMonthCostDocument = CreateDocument<
  IMonthCost,
  IMonthCostQueryHelpers,
  IMonthCostMethodsAndOverrides,
  IMonthCostVirtuals
>;

export type IMonthCostModel = CreateModel<
  IMonthCost,
  IMonthCostQueryHelpers,
  IMonthCostMethodsAndOverrides,
  IMonthCostVirtuals,
  IMonthCostStatics
>;

export const MonthCost: IMonthCostModel;
