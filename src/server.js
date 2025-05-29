import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';
import tasksRouter from './routers/tasks.js';

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

  app.use('/tasks', tasksRouter);
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
