import jwt from 'jsonwebtoken';
export const generateToken = (userId) => {
    const payload = { userId };
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};