import { check, validationResult } from 'express-validator';
import User from '../models/UsersModel.js';

const registerUser =[
    check('username').notEmpty().withMessage('Username is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('email').isEmail().withMessage('Invalid email address'),

async(req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => err.msg);
        return res.status(400).json({ errors: extractedErrors });
    }

    const {username, password, email } = req.body;

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
];

export default registerUser;