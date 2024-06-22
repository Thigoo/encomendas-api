import express from 'express';
import { fetchUserData, login, registerUser } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);

router.get('/me', protect, fetchUserData);

export default router;
