export interface IWaterUsage {
  id: string;
  meterId: string;
  reading: number;
  readingDate: Date;
  consumption: number;
  billAmount: number;
  status: 'pending' | 'paid' | 'overdue';
} 