import express from 'express';
import { userLogin, userRegister, getAllUsers} from '../controllers/authController.js';

const authRoutes = express.Router();

authRoutes.post('/register', userRegister);
authRoutes.post('/login', userLogin);
authRoutes.get('/users', getAllUsers);

export default authRoutes;