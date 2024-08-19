import * as dotenv from 'dotenv';
dotenv.config();

import morgan from 'morgan';

import tasksRouter from './router/taskRouter.js';
import usersRouter from './router/userRouter.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import express from 'express';
import {authenticateUser} from './middleware/authMiddleware.js'

import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const port = process.env.PORT || 5100;

const __dirname = dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.resolve(__dirname, './resource/dist')));

app.use('/api/tasks', authenticateUser, tasksRouter);
app.use('/api/users', usersRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './resource/dist', 'index.html'));
// });


app.listen(port, () => {
  console.log(`server running on PORT ${port}....`);
});