// creating a singleton class to store the data in memory, 
// pros: simple, fast and easy to implement, no dependencies
// cons: data is not persisted, so it will be lost when the server restarts
// used here for simplicity and speed, not for production, ideal for assignment

import * as fs from 'fs';
import * as path from 'path';

export class StorageService {
  private static instance: StorageService;
  private collections: Map<string, Map<string, any>>;
  private readonly dataDir: string;

  private constructor() {
    this.collections = new Map();
    this.dataDir = path.join(__dirname, '../../data');
    
    // Create data directory if it doesn't exist
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }

    // Load existing data from files
    this.loadCollections();
  }

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  private getFilePath(collectionName: string): string {
    return path.join(this.dataDir, `${collectionName}.json`);
  }

  private loadCollections(): void {
    const files = fs.readdirSync(this.dataDir);
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const collectionName = file.replace('.json', '');
        const filePath = path.join(this.dataDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        const collection = new Map(Object.entries(data));
        this.collections.set(collectionName, collection);
      }
    });
  }

  private saveCollection(collectionName: string): void {
    const collection = this.collections.get(collectionName);
    if (collection) {
      const data = Object.fromEntries(collection);
      const filePath = this.getFilePath(collectionName);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
  }

  public getCollection(name: string): Map<string, any> {
    if (!this.collections.has(name)) {
      this.collections.set(name, new Map());
      // Create empty JSON file for new collection
      this.saveCollection(name);
    }
    return this.collections.get(name)!;
  }

  public clearCollection(name: string): void {
    this.collections.delete(name);
    const filePath = this.getFilePath(name);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  public clearAll(): void {
    this.collections.clear();
    const files = fs.readdirSync(this.dataDir);
    files.forEach(file => {
      if (file.endsWith('.json')) {
        fs.unlinkSync(path.join(this.dataDir, file));
      }
    });
  }

  // Method to save changes to file
  public saveChanges(collectionName: string): void {
    this.saveCollection(collectionName);
  }
} 