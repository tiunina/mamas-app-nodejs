import { Router } from 'express';
import * as tasksController from '../controllers/tasks.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const tasksRouter = Router();
tasksRouter.get('/', ctrlWrapper(tasksController.getTasksController));

tasksRouter.get('/:taskId', ctrlWrapper(tasksController.getTaskByIdController));

export default tasksRouter;
