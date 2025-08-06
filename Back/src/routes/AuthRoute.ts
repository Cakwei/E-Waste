import { Router } from 'express';
const router = Router();
import {
  Login,
  Register,
  RefreshSession,
  Logout,
} from '../controller/AuthController';

router.post('/login', Login);
router.post('/register', Register);
router.post('/token', RefreshSession);
router.post('/logout', Logout);
router.post('/change-username', Logout);
export default router;