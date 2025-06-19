import { Router } from 'express';
import { AuthMiddleware } from '../lib/AuthMiddleware';
import {
  CreateCollection,
  GetAllOfUserCollection,
  FindUserCollection,
  UpdateUserCollection,
} from '../controller/WasteController';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

// Define routes and map to controller methods
router.post('/create', [AuthMiddleware, upload.array('img')], CreateCollection); // Map to getUsers function
router.post('/collection/:id', AuthMiddleware, FindUserCollection); // Map to getUsers function
router.patch('/collection/:id', AuthMiddleware, UpdateUserCollection); // Map to getUsers function
router.post('/user/:username', AuthMiddleware, GetAllOfUserCollection); // Map to getUsers function

export default router;
