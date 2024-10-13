import Router from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import { postJob } from "../controllers/jobs.controller.js";

const jobRouter = Router();

// All jobs route



export default jobRouter;