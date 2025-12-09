import authService from '../services/authService.js';
import { validateRegister, validateLogin } from '../utils/validator.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const validation = validateRegister({ name, email, password });
        if (!validation.valid) return res.status(400).json({ error: validation.error });

        const { user, token } = await authService.registerUser({ name, email, password });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: { user, token }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, error: error.message || 'Registration failed. Please try again.' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validation = validateLogin({ email, password });
        if (!validation.valid) return res.status(400).json({ error: validation.error });

        const { user, token } = await authService.loginUser({ email, password });

        res.json({
            success: true,
            message: 'Login successful',
            data: { user, token }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({ success: false, error: error.message || 'Invalid credentials' });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = await authService.getUserById(req.user.userId);
        res.json({ success: true, data: { user } });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(404).json({ success: false, error: error.message || 'User not found' });
    }
};

export const logout = async (req, res) => {
    res.json({ success: true, message: 'Logged out successfully' });
};