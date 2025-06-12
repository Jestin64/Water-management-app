import { IWaterMeter } from '../interfaces/IWaterMeter';

export interface IWaterMeterRepository {
  create(meter: Partial<IWaterMeter>): Promise<IWaterMeter>;
  findById(id: string): Promise<IWaterMeter | null>;
  findByMeterNumber(meterNumber: string): Promise<IWaterMeter | null>;
  update(id: string, meter: Partial<IWaterMeter>): Promise<IWaterMeter | null>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<IWaterMeter[]>;
  findByHouseId(houseId: string): Promise<IWaterMeter[]>;
} 