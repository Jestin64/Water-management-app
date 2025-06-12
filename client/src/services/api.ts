import axios from 'axios';
import { House, WaterMeter, WaterUsage } from '../types';

const API_URL = 'http://localhost:4000/api';

const api = {
  // Houses
  getHouses: async (): Promise<House[]> => {
    const response = await axios.get(`${API_URL}/houses`);
    return response.data;
  },

  getHouseById: async (id: string): Promise<House> => {
    const response = await axios.get(`${API_URL}/houses/${id}`);
    return response.data;
  },

  createHouse: async (house: Omit<House, 'id'>): Promise<House> => {
    const response = await axios.post(`${API_URL}/houses`, house);
    return response.data;
  },

  updateHouse: async (id: string, house: Partial<House>): Promise<House> => {
    const response = await axios.put(`${API_URL}/houses/${id}`, house);
    return response.data;
  },

  deleteHouse: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/houses/${id}`);
  },

  // Water Meters
  getWaterMeters: async (): Promise<WaterMeter[]> => {
    const response = await axios.get(`${API_URL}/water-meters`);
    return response.data;
  },

  getWaterMeterById: async (id: string): Promise<WaterMeter> => {
    const response = await axios.get(`${API_URL}/water-meters/${id}`);
    return response.data;
  },

  createWaterMeter: async (meter: Omit<WaterMeter, 'id'>): Promise<WaterMeter> => {
    const response = await axios.post(`${API_URL}/water-meters`, meter);
    return response.data;
  },

  updateWaterMeter: async (id: string, meter: Partial<WaterMeter>): Promise<WaterMeter> => {
    const response = await axios.put(`${API_URL}/water-meters/${id}`, meter);
    return response.data;
  },

  deleteWaterMeter: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/water-meters/${id}`);
  },

  // Water Usage
  getWaterUsage: async (): Promise<WaterUsage[]> => {
    const response = await axios.get(`${API_URL}/water-usage`);
    return response.data;
  },

  getWaterUsageById: async (id: string): Promise<WaterUsage> => {
    const response = await axios.get(`${API_URL}/water-usage/${id}`);
    return response.data;
  },

  createWaterUsage: async (usage: Omit<WaterUsage, 'id'>): Promise<WaterUsage> => {
    const response = await axios.post(`${API_URL}/water-usage`, usage);
    return response.data;
  },

  updateWaterUsage: async (id: string, usage: Partial<WaterUsage>): Promise<WaterUsage> => {
    const response = await axios.put(`${API_URL}/water-usage/${id}`, usage);
    return response.data;
  },

  deleteWaterUsage: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/water-usage/${id}`);
  },

  getWaterUsageByMeter: async (meterId: string): Promise<WaterUsage[]> => {
    const response = await axios.get(`${API_URL}/water-usage/meter/${meterId}`);
    return response.data;
  },

  getWaterUsageByDateRange: async (startDate: string, endDate: string): Promise<WaterUsage[]> => {
    const response = await axios.get(`${API_URL}/water-usage/date-range`, {
      params: { startDate, endDate }
    });
    return response.data;
  }
};

export default api; 