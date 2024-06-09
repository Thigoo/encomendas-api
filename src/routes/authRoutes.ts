import express from 'express';
import { login, registerUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);

export default router;
