import { Router } from 'express';

import {
  register,
  login,
  logout,
  getAllUsers,
  getCurrentUser
} from '../controller/usersController.js';

import {authenticateUser} from '../middleware/authMiddleware.js'

const usersRouter = Router();

usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.get('/logout', logout);
usersRouter.get('/currentUser',authenticateUser,getCurrentUser);
usersRouter.get('/',getAllUsers);

const authRouter = Router();

export default usersRouter;