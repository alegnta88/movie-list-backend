import express from 'express';
import { register, login, getCurrentUser, logout } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);

export default authRoutes;