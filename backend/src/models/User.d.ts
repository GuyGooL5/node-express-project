import { Types, Schema, Model } from 'mongoose';
import { ICostDocument } from './Cost';

export interface IUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  fullName: string;
  birthday: Date;
  maritalStatus: 'married' | 'single' | 'divorced' | 'widowed';
  costs: Types.ObjectId[];
}

export interface IUserDocument extends IUser, Document {
  addCost: (objectId: string) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
}

export type IUserSchema = Schema<IUserDocument>;

export interface IUserModel extends Model<IUserDocument> {
  findByUsername: (username: string) => Promise<IUserDocument>;
  getCostsByObjectId(objectId: string): Promise<ICostDocument[]>;
}

export type UserModel = Model<IUserDocument, IUserModel>;

const User: UserModel;

export = User;
