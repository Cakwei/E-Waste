import { Router } from 'express';
const router = Router();
import { Login, Register } from '../controller/AuthController';

// Define routes and map to controller methods
router.post('/login', Login); // Map to getUsers function
router.post('/register', Register); // Map to getUserById function

export default router;
