import { Model } from 'mongoose';
import { IUser, ICost } from './schemas';

export type UserModel = Model<IUser>;
export type CostModel = Model<ICost>;

export const User: UserModel;

export const Cost: CostModel;
