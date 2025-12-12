import prismaClient from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userRegister = async (req, res) => {
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
    res.status(200).json({ message: 'User registered successfully', user: selectedUserData });
}

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await prismaClient.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};