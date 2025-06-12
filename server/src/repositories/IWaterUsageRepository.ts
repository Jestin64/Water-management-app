import { IWaterUsage } from '../interfaces/IWaterUsage';

export interface IWaterUsageRepository {
  create(usage: Partial<IWaterUsage>): Promise<IWaterUsage>;
  findById(id: string): Promise<IWaterUsage | null>;
  update(id: string, usage: Partial<IWaterUsage>): Promise<IWaterUsage | null>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<IWaterUsage[]>;
  findByMeterId(meterId: string): Promise<IWaterUsage[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<IWaterUsage[]>;
} 