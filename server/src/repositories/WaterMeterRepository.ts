import { IWaterMeter } from '../interfaces/IWaterMeter';
import { IWaterMeterRepository } from './IWaterMeterRepository';
import { StorageService } from '../services/StorageService';

export class WaterMeterRepository implements IWaterMeterRepository {
  private collection: Map<string, IWaterMeter>;
  private readonly collectionName = 'waterMeters';

  constructor() {
    this.collection = StorageService.getInstance().getCollection(this.collectionName);
  }

  async create(meter: Partial<IWaterMeter>): Promise<IWaterMeter> {
    const id = Date.now().toString();
    const newMeter: IWaterMeter = {
      id,
      houseId: meter.houseId!,
      meterNumber: meter.meterNumber!,
      location: meter.location!,
      installationDate: meter.installationDate || new Date(),
      lastReading: meter.lastReading || 0,
      lastReadingDate: meter.lastReadingDate || new Date(),
      status: meter.status || 'active',
      threshold: meter.threshold || 1000,
    };

    this.collection.set(id, newMeter);
    StorageService.getInstance().saveChanges(this.collectionName);
    return newMeter;
  }

  async findById(id: string): Promise<IWaterMeter | null> {
    return this.collection.get(id) || null;
  }

  async findByMeterNumber(meterNumber: string): Promise<IWaterMeter | null> {
    for (const meter of this.collection.values()) {
      if (meter.meterNumber === meterNumber) {
        return meter;
      }
    }
    return null;
  }

  async update(id: string, meter: Partial<IWaterMeter>): Promise<IWaterMeter | null> {
    const existingMeter = await this.findById(id);
    if (!existingMeter) {
      return null;
    }

    const updatedMeter = {
      ...existingMeter,
      ...meter,
      id, // Ensure ID doesn't change
    };

    this.collection.set(id, updatedMeter);
    StorageService.getInstance().saveChanges(this.collectionName);
    return updatedMeter;
  }

  async delete(id: string): Promise<boolean> {
    const result = this.collection.delete(id);
    if (result) {
      StorageService.getInstance().saveChanges(this.collectionName);
    }
    return result;
  }

  async findAll(): Promise<IWaterMeter[]> {
    return Array.from(this.collection.values());
  }

  async findByHouseId(houseId: string): Promise<IWaterMeter[]> {
    return Array.from(this.collection.values()).filter(
      (meter) => meter.houseId === houseId
    );
  }
} 