import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is Required'],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    location:{
        type:String,
        default:"India"
    }
},{ timestamps: true })

const userModel = new mongoose.model("User",userSchema);

export default userModel;