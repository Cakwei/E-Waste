import { Router } from 'express';
const router = Router();
import { Login, Register, RefreshSession } from '../controller/AuthController';

router.post('/login', Login);
router.post('/register', Register);
router.post('/token', RefreshSession);

export default router;
