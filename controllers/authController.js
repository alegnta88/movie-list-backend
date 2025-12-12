export const register = async (req, res) => {
    const body = req.body;
    res.json({ message: 'User registered successfully', data: body });
};