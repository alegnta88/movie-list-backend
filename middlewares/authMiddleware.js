import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    let token = null;

    if (req.cookies?.token) {
        token = req.cookies.token;
    }

    else if (req.headers.authorization) {
        const parts = req.headers.authorization.split(" ");
        token = parts.length === 2 ? parts[1] : parts[0]; 
    }

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
};
