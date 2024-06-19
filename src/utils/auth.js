import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, isAdmin: user.isAdmin},
        process.env.JWT_SECRET, // Make sure you set JWT_SECRET in your environment variables
        { expiresIn: '1h' } // Token expires in 1 hour
    );
};

export default generateToken;
