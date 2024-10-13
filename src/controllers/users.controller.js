import express from "express";
import { ApiErrors } from "../utils/ApiErrors.js";
import userModel from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Controller or functionality to create and store a new user in the mongoDB database by perfrorming all the possible validations and checks
const userRegister = async (req, res) => {
    try {
        const { name, email, password, location } = req.body;

        if (!name) {
            new ApiErrors(404, "Name of user is missing");
        }
        if (!email) {
            new ApiErrors(404, "Email is missing");
        }
        if (!password) {
            new ApiErrors(404, "Password is missing")
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).send(new ApiResponse(409, [], `User Already exist with the email ${email}`));
        }


        const user = await userModel.create({
            name,
            email: email.toLowerCase(),
            password,
            location
        });


        if (!user) {
            new ApiErrors(500, "Something went wrong while registering user!!");
        }

        const token = user.createJWT();

        return res.status(200).json(
            {
                userData: new ApiResponse(201, user, `User created Succesfully!!`),
                token

            });


    } catch (err) {
        new ApiErrors(400, "Error while user Registering User", err);
    }
}

// Controller for user login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Email and password validation
        if (!email) {
            return new ApiErrors(400, "Email is required");
        }

        if (!password) {
            return new ApiErrors(400, "Password is required");
        }

        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            throw new ApiErrors(400, "Invalid email or/and password 1");
        }

        const passMatched = await user.comparePassword(password);
        if (!passMatched) {
            new ApiErrors(400, "Invalid email or/and password 2");
        }

        user.password = undefined;

        const token = user.createJWT();
        res.status(200).cookie("token", token).json({ userData: new ApiResponse(202, user, "Login Successful"), token });
    } catch (err) {
        new ApiErrors(400, "Error while user Login", err);
    }

}

// Controller for getting user details using email
const getUserDetails = async (req, res) => {
    const { email } = req.params;

    // fetching the user details from the database excluding the password
    const fetchUser = await userModel.findOne({ email }).select("-password");


    // validating whether the user exists or not with this email
    if (!fetchUser) {
        throw new ApiErrors(404, "No user exists with this email !!");
    }


    return res
        .status(200)
        .json(new ApiResponse(
            202, fetchUser, "User details fetched successfully"
        ));

}

// Controller to update user details
const updateUserDetails = async (req, res) => {
    const { name, email, location } = req.body;

    // updating user 
    // before that fetching the user from the database using the token
    const userId = req.user._id;
    // console.log(userId)

    const user = await userModel.findById(userId).select("-password");
    // console.log(user)



    if (name) {
        // console.log(name, email, location)
        user.name = name
        // console.log(name);
    }

    if (email) {
        const existingUserEmail = await userModel.findOne({ email }).select("-password");
        // Checking whether the new updated email already exists in database or not
        if (existingUserEmail) {
            return res.status(409).json(new ApiResponse(409, "Email already registered"));
        }

        // updating email
        user.email = email;
    }

    if (location) {
        user.location = location;
    }

    // Saving the updated details into the database
    await user.save({ validateBeforeSave: false });

    // Creating a new token for new updated details
    const newToken = user.createJWT();

    return res
        .status(200)
        .cookie("token", newToken)
        .json(new ApiResponse(202, user, "User details updated!!"));


}

// Controller to update the password
const changeCurrentPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    // console.log(oldPassword, newPassword)

    const userId = req.user?._id;

    const currUser = await userModel.findById(userId);

    const isPasswordValid = await currUser.comparePassword(oldPassword);

    if (!isPasswordValid) {
        throw new ApiErrors(401, "Invalid Old Password");
    }

    currUser.password = newPassword;

    await currUser.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(202, {}, "Password changed successfully"));


}

// User logout 
const userLogout = async (req, res) => {
    const userId = req.user?._id;

    // console.log(userId);

    return res
        .status(200)
        .clearCookie("token")
        .json(new ApiResponse(200, {}, "User Logged out Successfully"))
}

export { userRegister, userLogin, getUserDetails, updateUserDetails, changeCurrentPassword, userLogout };