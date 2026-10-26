import express from 'express';
import { optionalAuth, requireAtuh } from '../middleware/auth.js';
import { list,get} from '../controllers/projectController.js';
import { toggleLike } from '../controllers/communityControllers.js';



const communityRouter = express.Router();

communityRouter.get("/", optionalAuth, list);
communityRouter.get("/:id", optionalAuth, get);
communityRouter.get("/:id/like", requireAtuh, toggleLike);

export default communityRouter;