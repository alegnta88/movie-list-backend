import express from 'express';
import { register} from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const authRoutes = express.Router();

authRoutes.post('/register', register);

export default authRoutes;