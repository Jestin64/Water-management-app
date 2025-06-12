import { IWaterReading } from '../interfaces/IWaterReading';

export interface IWaterReadingRepository {
  create(reading: Partial<IWaterReading>): Promise<IWaterReading>;
  findById(id: string): Promise<IWaterReading | null>;
  findByMeterId(meterId: string): Promise<IWaterReading[]>;
  findByTimeRange(startDate: Date, endDate: Date): Promise<IWaterReading[]>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<IWaterReading[]>;
} 