import { Router } from 'express';
import { WaterMeterController } from '../controllers/WaterMeterController';
import { WaterMeterService } from '../services/WaterMeterService';
import { WaterMeterRepository } from '../repositories/WaterMeterRepository';

const router = Router();
const meterRepository = new WaterMeterRepository();
const meterService = new WaterMeterService(meterRepository);
const meterController = new WaterMeterController(meterService);

// Register a new meter
router.post('/', (req, res) => meterController.registerMeter(req, res));

// Get all meters
router.get('/', (req, res) => meterController.getAllMeters(req, res));

// Get meter by ID
router.get('/:id', (req, res) => meterController.getMeterById(req, res));

// Get meter by meter number
router.get('/number/:meterNumber', (req, res) => meterController.getMeterByNumber(req, res));

// Get meters by house ID
router.get('/house/:houseId', (req, res) => meterController.getMetersByHouse(req, res));

// Update meter
router.put('/:id', (req, res) => meterController.updateMeter(req, res));

// Delete meter
router.delete('/:id', (req, res) => meterController.deleteMeter(req, res));

// Update meter status
router.patch('/:id/status', (req, res) => meterController.updateMeterStatus(req, res));

// Update meter threshold
router.patch('/:id/threshold', (req, res) => meterController.updateMeterThreshold(req, res));

export default router; 