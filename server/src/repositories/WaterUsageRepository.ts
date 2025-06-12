import { IWaterUsage } from '../interfaces/IWaterUsage';
import { IWaterUsageRepository } from '../repositories/IWaterUsageRepository';
import { StorageService } from '../services/StorageService';

export class WaterUsageRepository implements IWaterUsageRepository {
  private collection: Map<string, IWaterUsage>;
  private readonly collectionName = 'waterUsages';

  constructor() {
    this.collection = StorageService.getInstance().getCollection(this.collectionName);
  }

  async create(usage: Partial<IWaterUsage>): Promise<IWaterUsage> {
    const id = Date.now().toString();
    const newUsage: IWaterUsage = {
      id,
      meterId: usage.meterId!,
      reading: usage.reading!,
      readingDate: usage.readingDate || new Date(),
      consumption: usage.consumption || 0,
      billAmount: usage.billAmount || 0,
      status: usage.status || 'pending',
    };

    this.collection.set(id, newUsage);
    StorageService.getInstance().saveChanges(this.collectionName);
    return newUsage;
  }

  async findById(id: string): Promise<IWaterUsage | null> {
    return this.collection.get(id) || null;
  }

  async update(id: string, usage: Partial<IWaterUsage>): Promise<IWaterUsage | null> {
    const existingUsage = await this.findById(id);
    if (!existingUsage) {
      return null;
    }

    const updatedUsage = {
      ...existingUsage,
      ...usage,
      id, // Ensure ID doesn't change
    };

    this.collection.set(id, updatedUsage);
    StorageService.getInstance().saveChanges(this.collectionName);
    return updatedUsage;
  }

  async delete(id: string): Promise<boolean> {
    const result = this.collection.delete(id);
    if (result) {
      StorageService.getInstance().saveChanges(this.collectionName);
    }
    return result;
  }

  async findAll(): Promise<IWaterUsage[]> {
    return Array.from(this.collection.values());
  }

  async findByMeterId(meterId: string): Promise<IWaterUsage[]> {
    return Array.from(this.collection.values()).filter(
      (usage) => usage.meterId === meterId
    );
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<IWaterUsage[]> {
    return Array.from(this.collection.values()).filter(
      (usage) =>
        usage.readingDate >= startDate && usage.readingDate <= endDate
    );
  }
} 