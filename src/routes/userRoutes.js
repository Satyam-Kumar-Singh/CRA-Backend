import express from 'express';
import registerUser from '../controllers/registerUser.js';

const router = express.Router();

router.route('/register').post(registerUser);

export default router;