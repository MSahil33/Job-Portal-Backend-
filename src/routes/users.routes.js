import express from 'express';
import { userRegister } from '../controllers/users.controller.js';

const userRouter = express.Router();

userRouter.route('/register').post(userRegister);

export default userRouter;