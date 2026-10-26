import express from 'express';
import { requireAtuh } from '../middleware/auth.js';
import { create, generate, get, list, loadOwnedProject, remove, update } from '../controllers/projectController.js';
import { githubRoute, vercelRoute } from './projectDeploy.js';

const projectRouter = express.Router();

projectRouter.get('/', requireAtuh, list);
projectRouter.post('/', requireAtuh, create);

projectRouter.get('/:id', requireAtuh, get);
projectRouter.patch("/:id", requireAtuh, update);

projectRouter.delete("/:id", requireAtuh, remove);
projectRouter.post('/:id/generate', requireAtuh, generate);

// to deploy the project (on vercel and create a repo on github)
projectRouter.post('/:id/github', requireAtuh, githubRoute(loadOwnedProject));
projectRouter.post("/:id/deploy", requireAtuh, vercelRoute(loadOwnedProject));

export default projectRouter;