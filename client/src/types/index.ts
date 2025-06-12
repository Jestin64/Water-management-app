export interface House {
  id: string;
  address: string;
  ownerName: string;
  contactNumber: string;
  email: string;
  status: 'active' | 'inactive';
}

export interface WaterMeter {
  id: string;
  houseId: string;
  meterNumber: string;
  location: string;
  installationDate: string;
  lastReading: number;
  lastReadingDate: string;
  status: 'active' | 'inactive' | 'maintenance';
  threshold: number;
}

export interface WaterUsage {
  id: string;
  meterId: string;
  reading: number;
  readingDate: string;
  consumption: number;
  billAmount: number;
  status: 'pending' | 'paid' | 'overdue';
} 