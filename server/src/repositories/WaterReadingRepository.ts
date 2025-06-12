import { IWaterReading } from '../interfaces/IWaterReading';
import { IWaterReadingRepository } from './IWaterReadingRepository';
import { StorageService } from '../services/StorageService';

export class WaterReadingRepository implements IWaterReadingRepository {
  private collection: Map<string, IWaterReading>;

  constructor() {
    this.collection = StorageService.getInstance().getCollection('waterReadings');
  }

  async create(reading: Partial<IWaterReading>): Promise<IWaterReading> {
    const id = Date.now().toString();
    const newReading: IWaterReading = {
      id,
      meterId: reading.meterId!,
      reading: reading.reading!,
      timestamp: reading.timestamp || new Date(),
      flowRate: reading.flowRate!,
      isAlert: reading.isAlert || false,
      alertReason: reading.alertReason,
    };

    this.collection.set(id, newReading);
    return newReading;
  }

  async findById(id: string): Promise<IWaterReading | null> {
    return this.collection.get(id) || null;
  }

  async findByMeterId(meterId: string): Promise<IWaterReading[]> {
    return Array.from(this.collection.values()).filter(
      (reading) => reading.meterId === meterId
    );
  }

  async findByTimeRange(startDate: Date, endDate: Date): Promise<IWaterReading[]> {
    return Array.from(this.collection.values()).filter((reading) => {
      const timestamp = new Date(reading.timestamp);
      return timestamp >= startDate && timestamp <= endDate;
    });
  }

  async delete(id: string): Promise<boolean> {
    return this.collection.delete(id);
  }

  async findAll(): Promise<IWaterReading[]> {
    return Array.from(this.collection.values());
  }
} 