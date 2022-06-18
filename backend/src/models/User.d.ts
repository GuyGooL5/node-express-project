import { ObjectId } from 'mongoose';
import { ICost, ICostDocument } from './Cost';
import { IMonthCostDocument } from './MonthCost';
import { CreateDocument, CreateModel } from './util';

export interface IUser {
  idNumber: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  maritalStatus?: 'married' | 'single' | 'divorced' | 'widowed';
  monthlyCosts: Record<string, IMonthCostDocument>;
}
interface IUserQueryHelpers {}

export interface IUserMethodsAndOverrides {
  addCost(costData: Omit<ICost, 'owner'>): Promise<void>;
  deleteCost(costId: string): Promise<void>;
  checkPassword(password: string): Promise<boolean>;
  getMonthCosts(month: number, year: number): Promise<IMonthCostDocument>;
}

export interface IUserVirtuals {
  fullName: string;
}

export interface IUserStatics {
  findByIdNumber(idNumber: string): Promise<IUserDocument>;
}

export type IUserDocument = CreateDocument<
  IUser,
  IUserQueryHelpers,
  IUserMethodsAndOverrides,
  IUserVirtuals
>;

export type IUserModel = CreateModel<
  IUser,
  IUserQueryHelpers,
  IUserMethodsAndOverrides,
  IUserVirtuals,
  IUserStatics
>;

declare const User: IUserModel;

//@ts-ignore
export = User;
