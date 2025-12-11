import { PrismaClient } from '../generated/prisma/index.js';
import 'dotenv/config';

const prismaClient = new PrismaClient({
    log:
        process.env.NODE_ENV === 'development'
            ? ['query', 'info', 'warn', 'error']
            : ['warn', 'error']
});

export default prismaClient;

export const connectDB = async () => {
    try {
        await prismaClient.$connect();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};