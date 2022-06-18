import { ObjectId } from 'mongoose';

export interface IReport {
  sum: number;
  costs: ObjectId[];
}
