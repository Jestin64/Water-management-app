export interface IWaterReading {
  id: string;
  meterId: string;
  reading: number;
  timestamp: Date;
  flowRate: number; // liters per hour
  isAlert: boolean;
  alertReason?: string;
} 