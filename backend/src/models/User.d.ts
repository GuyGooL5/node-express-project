import { Types, Schema, Model } from 'mongoose';
import { ICostDocument } from './Cost';

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  birthday: Date;
  marital_status: 'married' | 'single' | 'divorced' | 'widowed';
  costs: Types.ObjectId[];
}

export interface IUserDocument extends IUser, Document {
  addCost: (objectId: string) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
}

export type IUserSchema = Schema<IUserDocument>;

export interface IUserModel extends Model<IUserDocument> {
  findById: (id: string) => Promise<IUserDocument>;
  getCostsByObjectId(objectId: string): Promise<ICostDocument[]>;
}

export type UserModel = Model<IUserDocument, IUserModel>;

const User: UserModel;

export default User;
