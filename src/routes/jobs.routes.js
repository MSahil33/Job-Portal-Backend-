import Router from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import { getMyJobs, postJob } from "../controllers/jobs.controller.js";

const jobRouter = Router();

// All jobs route
jobRouter.route("/post-job").post(authenticateUser, postJob);
jobRouter.route("/my-jobs").get(authenticateUser, getMyJobs);



export default jobRouter;