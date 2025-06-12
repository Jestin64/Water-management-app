import { Request, Response } from 'express';
import { IWaterMeterService } from '../services/IWaterMeterService';

export class WaterMeterController {
  constructor(private readonly meterService: IWaterMeterService) {}

  async registerMeter(req: Request, res: Response): Promise<void> {
    try {
      const meter = await this.meterService.registerMeter(req.body);
      res.status(201).json(meter);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getMeterById(req: Request, res: Response): Promise<void> {
    try {
      const meter = await this.meterService.getMeterById(req.params.id);
      res.json(meter);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async getMeterByNumber(req: Request, res: Response): Promise<void> {
    try {
      const meter = await this.meterService.getMeterByNumber(req.params.meterNumber);
      res.json(meter);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async updateMeter(req: Request, res: Response): Promise<void> {
    try {
      const meter = await this.meterService.updateMeter(req.params.id, req.body);
      res.json(meter);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteMeter(req: Request, res: Response): Promise<void> {
    try {
      await this.meterService.deleteMeter(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async getAllMeters(req: Request, res: Response): Promise<void> {
    try {
      const meters = await this.meterService.getAllMeters();
      res.json(meters);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getMetersByHouse(req: Request, res: Response): Promise<void> {
    try {
      const meters = await this.meterService.getMetersByHouse(req.params.houseId);
      res.json(meters);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateMeterStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.body;
      const meter = await this.meterService.updateMeterStatus(req.params.id, status);
      res.json(meter);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async updateMeterThreshold(req: Request, res: Response): Promise<void> {
    try {
      const { threshold } = req.body;
      const meter = await this.meterService.updateMeterThreshold(req.params.id, threshold);
      res.json(meter);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
} 