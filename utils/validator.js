export const validateRegister = (data) => {
    const { name, email, password } = data;
    if (!name || !email || !password) {
        return { valid: false, error: 'All fields are required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, error: 'Invalid email format' };
    }

    if (password.length < 6) {
        return { valid: false, error: 'Password must be at least 6 characters long' };
    }

    return { valid: true };
};

export const validateLogin = (data) => {
    const { email, password } = data;
    if (!email || !password) {
        return { valid: false, error: 'Email and password are required' };
    }
    return { valid: true };
};