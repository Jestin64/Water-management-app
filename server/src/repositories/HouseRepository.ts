import { IHouse } from '../interfaces/IHouse';
import { IHouseRepository } from './IHouseRepository';
import { StorageService } from '../services/StorageService';

export class HouseRepository implements IHouseRepository {
  private collection: Map<string, IHouse>;
  private readonly collectionName = 'houses';

  constructor() {
    this.collection = StorageService.getInstance().getCollection(this.collectionName);
  }

  async create(house: Partial<IHouse>): Promise<IHouse> {
    const id = Date.now().toString();
    const newHouse: IHouse = {
      id,
      address: house.address!,
      ownerName: house.ownerName!,
      contactNumber: house.contactNumber!,
      email: house.email!,
      status: house.status || 'active',
    };

    this.collection.set(id, newHouse);
    StorageService.getInstance().saveChanges(this.collectionName);
    return newHouse;
  }

  async findById(id: string): Promise<IHouse | null> {
    return this.collection.get(id) || null;
  }

  async update(id: string, house: Partial<IHouse>): Promise<IHouse | null> {
    const existingHouse = await this.findById(id);
    if (!existingHouse) {
      return null;
    }

    const updatedHouse = {
      ...existingHouse,
      ...house,
      id, // Ensure ID doesn't change
    };

    this.collection.set(id, updatedHouse);
    StorageService.getInstance().saveChanges(this.collectionName);
    return updatedHouse;
  }

  async delete(id: string): Promise<boolean> {
    const result = this.collection.delete(id);
    if (result) {
      StorageService.getInstance().saveChanges(this.collectionName);
    }
    return result;
  }

  async findAll(): Promise<IHouse[]> {
    return Array.from(this.collection.values());
  }

  async findByOwnerName(ownerName: string): Promise<IHouse[]> {
    return Array.from(this.collection.values()).filter(
      (house) => house.ownerName.toLowerCase().includes(ownerName.toLowerCase())
    );
  }
} 