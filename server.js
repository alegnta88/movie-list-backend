import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import 'dotenv/config';
import { registerUser } from './services/authService.js';
import { register } from './controllers/authController.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', register);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});