const express = require('express');
const { register, login, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { loginRules, validate } = require('../middleware/validators');

const router = express.Router();

router.post('/register', register); // In production, protect this behind protect + authorize('admin')
router.post('/login', loginRules, validate, login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;
