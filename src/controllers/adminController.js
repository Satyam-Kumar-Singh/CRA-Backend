import Complaint from '../models/ComplaintModel.js';


const fetchcomplaints = async (req,res) => {
    try {
        const complaints = await Complaint.findAll();
        res.status(200).json({
            status: 'success',
            data: complaints
        });
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ error: 'An error occurred while fetching complaints. Please try again later.' });
    }
}

const updatestatus = async(req,res)=>{

    const { id } = req.params;
    const { status } = req.body;

    try {
        const complaint = await Complaint.findByPk(id);

        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found.' });
        }

        complaint.status = status;
        await complaint.save();

        res.status(200).json({
            status: 'success',
            message: 'Complaint status updated successfully',
            data: complaint
        });
    } catch (error) {
        console.error('Error updating complaint status:', error);
        res.status(500).json({ error: 'An error occurred while updating the complaint status. Please try again later.' });
    }
}

export { fetchcomplaints, updatestatus };