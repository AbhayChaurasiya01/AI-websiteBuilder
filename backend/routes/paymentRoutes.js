import express from 'express';
import { createSession, listHistory, listPackages, verifySession } from '../controllers/paymentsControllers.js';
import { requireAtuh } from '../middleware/auth.js';

const paymentRouter = express.Router();

paymentRouter.get("/packages", listPackages);
paymentRouter.post("/create-checkout-session", requireAtuh, createSession );

paymentRouter.post("/verify-session", requireAtuh, verifySession);
paymentRouter.get("/history", requireAtuh, listHistory);

export default paymentRouter;