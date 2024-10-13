import jwt from "jsonwebtoken";
import User from "../models/users.model.js";
import { ApiErrors } from "../utils/ApiErrors.js";

const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            throw new ApiErrors(409, "Authorization failed");
        }

        const token = authHeader.replace("Bearer ", "");
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        // console.log(payload);
        const userId = payload._id;
        const currUser = await User.findById(userId).select("-password");

        if (!currUser) {
            throw new ApiErrors(409, "Authorization failed");
        }
        // console.log(currUser)

        // only storing the userId to get the user
        req.user = currUser;

        next();
    } catch (err) {
        throw new ApiErrors(409, "Authorization failed", err);
    }
}

export default authenticateUser;