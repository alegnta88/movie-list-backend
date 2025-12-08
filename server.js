import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import 'dotenv/config';

console.log('Environment check:');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('DATABASE_URL preview:', process.env.DATABASE_URL?.substring(0, 20) + '...');
console.log('PORT:', process.env.PORT);

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});