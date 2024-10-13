import Router from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import { deleteJob, getMyJobs, postJob, updateJob } from "../controllers/jobs.controller.js";

const jobRouter = Router();

// All jobs route
jobRouter.route("/post-job").post(authenticateUser, postJob);
jobRouter.route("/my-jobs").get(authenticateUser, getMyJobs);
jobRouter.route("/update-job/:id").put(authenticateUser, updateJob);
jobRouter.route("/delete-job/:id").delete(authenticateUser, deleteJob);


export default jobRouter;