import express from 'express';
import { userRegister,userLogin } from '../controllers/users.controller.js';

const userRouter = express.Router();

// All user routes
userRouter.route('/register').post(userRegister);
userRouter.route('/login').post(userLogin);

export default userRouter;