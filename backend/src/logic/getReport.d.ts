import { IReport } from '../models/Report';

async function getReport(
  userObjectId: string,
  month: number,
  year: number,
): Promise<IReport>;

export = getReport;
