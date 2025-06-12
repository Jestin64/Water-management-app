import { Router } from 'express';
import { HouseController } from '../controllers/HouseController';
import { HouseService } from '../services/HouseService';
import { HouseRepository } from '../repositories/HouseRepository';

const router = Router();
const houseRepository = new HouseRepository();
const houseService = new HouseService(houseRepository);
const houseController = new HouseController(houseService);

// Create a new house
router.post('/', (req, res) => houseController.createHouse(req, res));

// Get all houses
router.get('/', (req, res) => houseController.getAllHouses(req, res));

// Get house by ID
router.get('/:id', (req, res) => houseController.getHouseById(req, res));

// Update house
router.put('/:id', (req, res) => houseController.updateHouse(req, res));

// Delete house
router.delete('/:id', (req, res) => houseController.deleteHouse(req, res));

// Get houses by owner name
router.get('/owner/:ownerName', (req, res) => houseController.getHousesByOwner(req, res));

export default router; 