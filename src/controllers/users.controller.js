import express from "express";
import { ApiErrors } from "../utils/ApiErrors.js";
import userModel from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const userRegister = async (req,res)=>{
    try{
        const {name,email,password,location} = req.body;

        if(!name){
            throw new ApiErrors(400,"Name of user is missing");
        }
        if(!email){
            throw new ApiErrors(400,"Email is missing");
        }
        if(!password){
            throw new ApiErrors(400,"Password is missing")
        }

        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(409).send(new ApiResponse(409,[],"Email Already Registered"));
        }

        const user = await userModel.create({
            name,
            email: email.toLowerCase(),
            password,
            location
        });

        if(!user){
            throw new ApiErrors(500,"Something went wrong while registering user!!"); 
        }

        return res.status(200).json(new ApiResponse(201,user,"User created Succesfully!!"));

    }catch(err){
        throw new ApiErrors(400,"Error while user Registering User");
    }
}

export {userRegister};