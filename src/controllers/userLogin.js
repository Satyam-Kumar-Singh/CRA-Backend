import User from '../models/UsersModel.js';
import generateToken from '../utils/auth.js';

const userLogin  = async(req,res) => {
    const {username , password } = req.body;

    try {
        
        const user = await User.findOne({ where: {username} });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        } 

        // Compare password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user);
        // Exclude sensitive information
        user.password = undefined;

        res.status(200).json({
            status : 'success',
            message : 'Login successful',
            data:{
                user,
                token
            }
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login. Please try again later.' });
    }
}

export default userLogin;