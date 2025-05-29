import createHttpError from 'http-errors';

import * as taskServices from '../services/tasks.js';

export const getTasksController = async (req, res) => {
  const tasks = await taskServices.getTasks();
  res.json({
    status: 200,
    message: 'Successfully found tasks!',
    data: tasks,
  });
};

export const getTaskByIdController = async (req, res) => {
  const { taskId } = req.params;
  const data = await taskServices.getTaskById(taskId);
  if (!data) {
    throw createHttpError(404, `task with id ${taskId} is not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found task with id ${taskId}!`,
    data,
  });
};
