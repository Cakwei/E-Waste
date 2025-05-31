import { Router } from 'express';
import { AuthMiddleware } from '../lib/AuthMiddleware';
import { createForm } from '../controller/WasteController';

const router = Router();

// Define routes and map to controller methods
router.post('/create', AuthMiddleware, createForm); // Map to getUsers function

export default router;
