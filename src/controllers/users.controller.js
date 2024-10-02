import express from "express";
import { ApiErrors } from "../utils/ApiErrors.js";
import userModel from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Controller or functionality to create and store a new user in the mongoDB database by perfrorming all the possible validations and checks
const userRegister = async (req,res)=>{
    try{
        const {name,email,password,location} = req.body;

        if(!name){
            new ApiErrors(404,"Name of user is missing");
        }
        if(!email){
            new ApiErrors(404,"Email is missing");
        }
        if(!password){
            new ApiErrors(404,"Password is missing")
        }

        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(409).send(new ApiResponse(409,[],`User Already exist with the email ${email}`));
        }


        const user = await userModel.create({
            name,
            email: email.toLowerCase(),
            password,
            location
        });


        if(!user){
            new ApiErrors(500,"Something went wrong while registering user!!"); 
        }
        
        const token = user.createJWT();

        return res.status(200).json(
            {
                userData : new ApiResponse(201,user,`User created Succesfully!!`),
                token

            });


    }catch(err){
        new ApiErrors(400,"Error while user Registering User",err);
    }
}


// Controller for user login

const userLogin = async (req,res)=>{
    try{
        const {email,password} = req.body;

        // Email and password validation
        if(!email){
            new ApiErrors(400,"Email is required",err);
        }

        if(!password){
            new ApiErrors(400,"Password is required",err);
        }

        const user = await userModel.findOne({email}).select("+password");
        if(!user){
            throw new ApiErrors(400,"Invalid email or/and password");
        }

        const passMatched = await user.comparePassword(password);
        if(!passMatched){
            new ApiErrors(400,"Invalid email or/and password");
        }

        user.password = undefined;

        const token = user.createJWT();
        res.status(200).json({userData : new ApiResponse(202,user,"Login Successful"),token});


    }catch(err){
        new ApiErrors(400,"Error while user Login",err);
    }
    
}
export {userRegister,userLogin};