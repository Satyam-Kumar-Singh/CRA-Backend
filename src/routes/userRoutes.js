import express from 'express';
import registerUser from '../controllers/registerUser.js';
import userLogin from '../controllers/userLogin.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(userLogin);

export default router;