import { IWaterMeter } from '../interfaces/IWaterMeter';

export interface IWaterMeterService {
  registerMeter(meter: Partial<IWaterMeter>): Promise<IWaterMeter>;
  getMeterById(id: string): Promise<IWaterMeter>;
  getMeterByNumber(meterNumber: string): Promise<IWaterMeter>;
  updateMeter(id: string, meter: Partial<IWaterMeter>): Promise<IWaterMeter>;
  deleteMeter(id: string): Promise<void>;
  getAllMeters(): Promise<IWaterMeter[]>;
  getMetersByHouse(houseId: string): Promise<IWaterMeter[]>;
  updateMeterStatus(id: string, status: 'active' | 'inactive' | 'maintenance'): Promise<IWaterMeter>;
  updateMeterThreshold(id: string, threshold: number): Promise<IWaterMeter>;
} 