import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const payload = { userId };
    const options = { expiresIn: '1h' };

    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return token;
};