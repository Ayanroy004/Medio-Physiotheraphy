import express from 'express';
import { register, login, logout, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { loginRules, validate } from '../middleware/validators.js';

const router = express.Router();

router.post('/register', register); // In production, protect this behind protect + authorize('admin')
router.post('/login', loginRules, validate, login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

export default router;
