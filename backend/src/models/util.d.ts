import { Document, Model, ObjectId } from 'mongoose';

type CreateDocument<
  TDocType = any,
  TQueryHelpers = any,
  TMethodsAndOverrides = any,
  TVirtuals = any,
> = Document<ObjectId, TQueryHelpers, TDocType> &
  TDocType &
  TMethodsAndOverrides &
  TVirtuals;

type CreateModel<
  TDocType = any,
  TQueryHelpers = any,
  TMethodsAndOverrides = any,
  TVirtuals = any,
  TStatics = any,
> = Model<TDocType, TQueryHelpers, TMethodsAndOverrides, TVirtuals> & TStatics;
