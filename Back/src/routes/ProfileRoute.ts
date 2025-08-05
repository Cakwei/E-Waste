import { Router } from 'express';
import { AuthMiddleware } from '../lib/AuthMiddleware';
import {
  changeEmail,
  changePassword,
  changeUsername,
} from '../controller/ProfileController';

const router = Router();

// Define routes and map to controller methods
router.post('/:email/change-username', AuthMiddleware, changeUsername); // Map to getUsers function
router.post('/:email/change-password', AuthMiddleware, changePassword);
router.post('/:email/change-email', AuthMiddleware, changeEmail);
export default router;
