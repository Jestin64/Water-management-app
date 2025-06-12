import { IHouse } from '../interfaces/IHouse';

export interface IHouseRepository {
  create(house: Partial<IHouse>): Promise<IHouse>;
  findById(id: string): Promise<IHouse | null>;
  update(id: string, house: Partial<IHouse>): Promise<IHouse | null>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<IHouse[]>;
  findByOwnerName(ownerName: string): Promise<IHouse[]>;
} 