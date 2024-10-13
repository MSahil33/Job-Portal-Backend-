import express from 'express';
import { userRegister, userLogin, getUserDetails, updateUserDetails, changeCurrentPassword, userLogout } from '../controllers/users.controller.js';
import authenticateUser from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

// All user routes
userRouter.route('/register').post(userRegister);
userRouter.route('/login').post(userLogin);
userRouter.route('/u/:email').get(authenticateUser, getUserDetails);
userRouter.route('/update-user').put(authenticateUser, updateUserDetails);
userRouter.route('/change-pass').put(authenticateUser, changeCurrentPassword);
userRouter.route('/logout').post(authenticateUser, userLogout);

export default userRouter;