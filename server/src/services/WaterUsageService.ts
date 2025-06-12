import { IWaterUsage } from '../interfaces/IWaterUsage';
import { IWaterUsageRepository } from '../repositories/IWaterUsageRepository';

export class WaterUsageService {
  constructor(private waterUsageRepository: IWaterUsageRepository) {}

  async create(usage: Partial<IWaterUsage>): Promise<IWaterUsage> {
    if (!usage.meterId || !usage.reading || !usage.readingDate || 
        usage.consumption === undefined || usage.billAmount === undefined || !usage.status) {
      throw new Error('Missing required fields');
    }
    return this.waterUsageRepository.create(usage);
  }

  async findAll(): Promise<IWaterUsage[]> {
    return this.waterUsageRepository.findAll();
  }

  async findById(id: string): Promise<IWaterUsage | null> {
    return this.waterUsageRepository.findById(id);
  }

  async update(id: string, usage: Partial<IWaterUsage>): Promise<IWaterUsage | null> {
    const existingUsage = await this.findById(id);
    if (!existingUsage) {
      return null;
    }
    return this.waterUsageRepository.update(id, usage);
  }

  async delete(id: string): Promise<boolean> {
    return this.waterUsageRepository.delete(id);
  }

  async findByMeterId(meterId: string): Promise<IWaterUsage[]> {
    return this.waterUsageRepository.findByMeterId(meterId);
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<IWaterUsage[]> {
    return this.waterUsageRepository.findByDateRange(startDate, endDate);
  }
} 