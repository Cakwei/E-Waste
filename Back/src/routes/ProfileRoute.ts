import { Router } from 'express';
import { AuthMiddleware } from '../lib/AuthMiddleware';
import { changeUsername } from '../controller/ProfileController';

const router = Router();

// Define routes and map to controller methods
router.post('/:email/change-username', AuthMiddleware, changeUsername); // Map to getUsers function
export default router;
