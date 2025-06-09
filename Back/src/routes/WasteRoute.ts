import { Router } from 'express';
import { AuthMiddleware } from '../lib/AuthMiddleware';
import { CreateCollection } from '../controller/WasteController';

const router = Router();

// Define routes and map to controller methods
router.post('/create', AuthMiddleware, CreateCollection); // Map to getUsers function

export default router;
