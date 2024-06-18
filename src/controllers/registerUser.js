import User from '../models/UsersModel.js';

const registerUser = async(req,res) => {
    const {username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({
            error: 'Username, password, and email are required'
        });
    }
    try {
        const newUser = await User.create({ username, password, email });
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                isAdmin: newUser.isAdmin
            }
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({
                error: 'Username or email already exists'
            });
        } else {
            res.status(500).json({
                error: 'An error occurred while registering the user'
            });
        }
    }
}

export default registerUser;