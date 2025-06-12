import { Router } from 'express';
import { WaterUsageController } from '../controllers/WaterUsageController';
import { WaterUsageService } from '../services/WaterUsageService';
import { WaterUsageRepository } from '../repositories/WaterUsageRepository';

const router = Router();
const usageRepository = new WaterUsageRepository();
const usageService = new WaterUsageService(usageRepository);
const usageController = new WaterUsageController(usageService);

// Create a new water usage record
router.post('/', (req, res) => usageController.createUsage(req, res));

// Get all water usage records
router.get('/', (req, res) => usageController.getAllUsage(req, res));

// Get water usage by ID
router.get('/:id', (req, res) => usageController.getUsageById(req, res));

// Update water usage
router.put('/:id', (req, res) => usageController.updateUsage(req, res));

// Delete water usage
router.delete('/:id', (req, res) => usageController.deleteUsage(req, res));

// Get water usage by meter ID
router.get('/meter/:meterId', (req, res) => usageController.getUsageByMeter(req, res));

// Get water usage by date range
router.get('/date-range', (req, res) => usageController.getUsageByDateRange(req, res));

export default router; 