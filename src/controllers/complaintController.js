import Complaint from '../models/ComplaintModel.js';
import User from '../models/UsersModel.js';


const complaint = async (req,res) =>{

    const { userId, title, description, category } = req.body;

    try {
        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new complaint
        const complaint = await Complaint.create({
            userId,
            title,
            description,
            category
        });

        res.status(201).json({
            status: 'success',
            message: 'Complaint submitted successfully',
            data: complaint
        });
    } catch (error) {
        console.error('Error submitting complaint:', error);
        res.status(500).json({ error: 'An error occurred while submitting the complaint. Please try again later.' });
    }
};

export default complaint;