import { Request, Response } from 'express';
import { HouseService } from '../services/HouseService';

export class HouseController {
  constructor(private houseService: HouseService) {}

  createHouse = async (req: Request, res: Response) => {
    try {
      const house = await this.houseService.create(req.body);
      res.status(201).json(house);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  getAllHouses = async (req: Request, res: Response) => {
    try {
      const houses = await this.houseService.findAll();
      res.json(houses);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  getHouseById = async (req: Request, res: Response) => {
    try {
      const house = await this.houseService.findById(req.params.id);
      if (!house) {
        return res.status(404).json({ error: 'House not found' });
      }
      res.json(house);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  updateHouse = async (req: Request, res: Response) => {
    try {
      const house = await this.houseService.update(req.params.id, req.body);
      if (!house) {
        return res.status(404).json({ error: 'House not found' });
      }
      res.json(house);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  deleteHouse = async (req: Request, res: Response) => {
    try {
      const success = await this.houseService.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'House not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  getHousesByOwner = async (req: Request, res: Response) => {
    try {
      const houses = await this.houseService.findByOwnerName(req.params.ownerName);
      res.json(houses);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
} 