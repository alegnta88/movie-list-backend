import express from 'express';
import { userLogin, userRegister, getAllUsers, userLogout} from '../controllers/authController.js';

const authRoutes = express.Router();

authRoutes.post('/register', userRegister);
authRoutes.post('/login', userLogin);
authRoutes.get('/users', getAllUsers);
authRoutes.post('/logout', userLogout);

export default authRoutes;