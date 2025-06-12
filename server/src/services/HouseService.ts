import { IHouse } from '../interfaces/IHouse';
import { IHouseRepository } from '../repositories/IHouseRepository';

export class HouseService {
  constructor(private houseRepository: IHouseRepository) {}

  async create(house: Partial<IHouse>): Promise<IHouse> {
    if (!house.address || !house.ownerName || !house.contactNumber || !house.email) {
      throw new Error('Missing required fields');
    }
    return this.houseRepository.create(house);
  }

  async findAll(): Promise<IHouse[]> {
    return this.houseRepository.findAll();
  }

  async findById(id: string): Promise<IHouse | null> {
    return this.houseRepository.findById(id);
  }

  async update(id: string, house: Partial<IHouse>): Promise<IHouse | null> {
    const existingHouse = await this.findById(id);
    if (!existingHouse) {
      return null;
    }
    return this.houseRepository.update(id, house);
  }

  async delete(id: string): Promise<boolean> {
    return this.houseRepository.delete(id);
  }

  async findByOwnerName(ownerName: string): Promise<IHouse[]> {
    return this.houseRepository.findByOwnerName(ownerName);
  }
} 