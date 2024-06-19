import express from 'express';
import registerUser from '../controllers/registerUser.js';
import userLogin from '../controllers/userLogin.js';
import complaint from '../controllers/complaintController.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(userLogin);
router.route('/complaint').post(complaint);

export default router;