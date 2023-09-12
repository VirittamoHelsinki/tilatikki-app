import express from 'express';
import {register, login, forgotPassword} from '../controllers/authControllers';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);



export default router;