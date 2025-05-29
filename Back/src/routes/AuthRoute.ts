import { Router } from 'express';
const router = Router();
import { login, register } from '../controller/AuthController';

// Define routes and map to controller methods
router.post('/login', login); // Map to getUsers function
router.post('/register', register); // Map to getUserById function

export default router;
