import express from 'express';
import isAdmin from '../middlewares/isAdminMiddleware.js'; 
import {fetchcomplaints,updatestatus} from '../controllers/adminController.js';

const router = express.Router();

// Example of an admin-only route
router.route('/fetchcomplain').get(isAdmin, fetchcomplaints);
router.route('/updatestatus/:id').patch(isAdmin,updatestatus);

export default router;