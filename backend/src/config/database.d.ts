import { Mongoose } from 'mongoose';

export function connect(
  username: string,
  password: string,
  host: string,
  dbName: string = 'test',
): Promise<Mongoose>;
