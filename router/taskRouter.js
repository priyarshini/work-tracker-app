import { Router } from 'express';

import {
  getAllTasks,
  getTasksById,
  addTask,
  editTask,
  removeTask
} from '../controller/taskController.js';

const tasksRouter = Router();

tasksRouter
  .route('/')
  .get(getAllTasks)
  .post(addTask);

  tasksRouter
  .route('/:id')
  .get(getTasksById)
  .patch(editTask)
  .delete(removeTask);

export default tasksRouter;