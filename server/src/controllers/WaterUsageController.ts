import { Request, Response } from 'express';
import { WaterUsageService } from '../services/WaterUsageService';

export class WaterUsageController {
  constructor(private waterUsageService: WaterUsageService) {}

  createUsage = async (req: Request, res: Response) => {
    try {
      const usage = await this.waterUsageService.create(req.body);
      res.status(201).json(usage);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  getAllUsage = async (req: Request, res: Response) => {
    try {
      const usages = await this.waterUsageService.findAll();
      res.json(usages);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  getUsageById = async (req: Request, res: Response) => {
    try {
      const usage = await this.waterUsageService.findById(req.params.id);
      if (!usage) {
        return res.status(404).json({ error: 'Water usage record not found' });
      }
      res.json(usage);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  updateUsage = async (req: Request, res: Response) => {
    try {
      const usage = await this.waterUsageService.update(req.params.id, req.body);
      if (!usage) {
        return res.status(404).json({ error: 'Water usage record not found' });
      }
      res.json(usage);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  deleteUsage = async (req: Request, res: Response) => {
    try {
      const success = await this.waterUsageService.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Water usage record not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  getUsageByMeter = async (req: Request, res: Response) => {
    try {
      const usages = await this.waterUsageService.findByMeterId(req.params.meterId);
      res.json(usages);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  getUsageByDateRange = async (req: Request, res: Response) => {
    try {
      const { startDate, endDate } = req.query;
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
      }
      const usages = await this.waterUsageService.findByDateRange(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.json(usages);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
} 