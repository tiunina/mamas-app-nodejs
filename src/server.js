import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';

import * as taskServices from './services/tasks.js';

export const startServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transpost: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/tasks', async (req, res) => {
    const tasks = await taskServices.getTasks();
    res.json({
      status: 200,
      message: 'Successfully found tasks!',
      data: tasks,
    });
  });

  app.get('/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const data = await taskServices.getTaskById(taskId);
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Task is not found`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully found task with id ${taskId}!`,
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `Not found`,
    });
  });

  app.use((error, res, req, next) => {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  });

  const PORT = Number(getEnvVar('PORT', 3000));

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
