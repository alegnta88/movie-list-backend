import prismaClient from '../config/db.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await prismaClient.user.findUnique({
        where: { email: email }
    });

    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const selectedUserData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
    };
    res.status(201).json({ message: 'User registered successfully', user: selectedUserData });
}