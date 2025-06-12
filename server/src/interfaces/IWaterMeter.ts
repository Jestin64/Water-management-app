export interface IWaterMeter {
  id: string;
  houseId: string;
  meterNumber: string;
  location: string;
  installationDate: Date;
  lastReading: number;
  lastReadingDate: Date;
  status: 'active' | 'inactive' | 'maintenance';
  threshold: number; // in liters per hour
} 