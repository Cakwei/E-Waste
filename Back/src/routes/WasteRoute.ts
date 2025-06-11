import { Router } from 'express';
import { AuthMiddleware } from '../lib/AuthMiddleware';
import { CreateCollection, GetCollection } from '../controller/WasteController';

const router = Router();

// Define routes and map to controller methods
router.post('/create', AuthMiddleware, CreateCollection); // Map to getUsers function
router.post('/:email', AuthMiddleware, GetCollection); // Map to getUsers function

export default router;
