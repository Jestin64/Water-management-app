import { IWaterMeter } from '../interfaces/IWaterMeter';
import { IWaterMeterService } from './IWaterMeterService';
import { IWaterMeterRepository } from '../repositories/IWaterMeterRepository';

export class WaterMeterService implements IWaterMeterService {
  constructor(private readonly meterRepository: IWaterMeterRepository) {}

  async registerMeter(meter: Partial<IWaterMeter>): Promise<IWaterMeter> {
    const existingMeter = await this.meterRepository.findByMeterNumber(meter.meterNumber!);
    if (existingMeter) {
      throw new Error('Meter number already exists');
    }
    return await this.meterRepository.create(meter);
  }

  async getMeterById(id: string): Promise<IWaterMeter> {
    const meter = await this.meterRepository.findById(id);
    if (!meter) {
      throw new Error('Meter not found');
    }
    return meter;
  }

  async getMeterByNumber(meterNumber: string): Promise<IWaterMeter> {
    const meter = await this.meterRepository.findByMeterNumber(meterNumber);
    if (!meter) {
      throw new Error('Meter not found');
    }
    return meter;
  }

  async updateMeter(id: string, meter: Partial<IWaterMeter>): Promise<IWaterMeter> {
    const updatedMeter = await this.meterRepository.update(id, meter);
    if (!updatedMeter) {
      throw new Error('Meter not found');
    }
    return updatedMeter;
  }

  async deleteMeter(id: string): Promise<void> {
    const deleted = await this.meterRepository.delete(id);
    if (!deleted) {
      throw new Error('Meter not found');
    }
  }

  async getAllMeters(): Promise<IWaterMeter[]> {
    return await this.meterRepository.findAll();
  }

  async getMetersByHouse(houseId: string): Promise<IWaterMeter[]> {
    return await this.meterRepository.findByHouseId(houseId);
  }

  async updateMeterStatus(id: string, status: 'active' | 'inactive' | 'maintenance'): Promise<IWaterMeter> {
    const meter = await this.meterRepository.update(id, { status });
    if (!meter) {
      throw new Error('Meter not found');
    }
    return meter;
  }

  async updateMeterThreshold(id: string, threshold: number): Promise<IWaterMeter> {
    if (threshold <= 0) {
      throw new Error('Threshold must be greater than 0');
    }
    const meter = await this.meterRepository.update(id, { threshold });
    if (!meter) {
      throw new Error('Meter not found');
    }
    return meter;
  }
} 