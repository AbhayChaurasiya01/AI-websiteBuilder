import express from 'express';
import {contributions, deleteAccount, login, me, register, resendRegister, updateProfile, verifyRegister} from '../controllers/authControllers.js';
import { requireAtuh } from '../middleware/auth.js';
import forgotRoutes from './authForgot.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/register/verify', verifyRegister);
authRouter.post('/register/resend', resendRegister);
authRouter.post('/login', login);

//to access these routes user must be logged - in
authRouter.get('/me', requireAtuh, me);
authRouter.get('/me/contributions', requireAtuh, contributions);

authRouter.patch('/me',requireAtuh, updateProfile);
authRouter.patch('/me/password',requireAtuh, updateProfile);
authRouter.delete('/me', requireAtuh, deleteAccount);

// for forgot password and reset it
authRouter.use("/frogot", forgotRoutes);

export default authRouter;




