import { Types, Schema, Model, Document } from 'mongoose';
import { ICostDocument } from './Cost';

export interface IUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  maritalStatus: 'married' | 'single' | 'divorced' | 'widowed';
  costs: Types.ObjectId[];
}

export type IUserSchema = Schema<IUser>;

export type IUserDocument<T = any, TQueryHelpers = any> = Document<T, TQueryHelpers, IUser>;

export interface IUserQueryHelpers {}

export interface IUserMethodsAndOverrides {
  addCost: (objectId: string) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
  findByUsername: (username: string) => Promise<IUserDocument>;
  getCostsByObjectId(objectId: string): Promise<ICostDocument[]>;
}

export interface IUserVirtuals {
  fullName: string;
}

export type IUserModel = Model<IUserSchema, IUserQueryHelpers, IUserMethodsAndOverrides, IUserVirtuals>;

declare const User: IUserModel;

//@ts-ignore
export = User;
