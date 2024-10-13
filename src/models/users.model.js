import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User document Schema
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
        select:true
    },
    location:{
        type:String,
        default:"India"
    }
},{ timestamps: true });


// Middleware to hash the password before saving the user document using the bcrypt
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10); // Here 10 is the length of salt text
    }
    next();
});

// Function for generating the acces  token
userSchema.methods.createJWT = function () {
    return jwt.sign(
      // Payload data
      {
        _id: this._id,
        email: this.email,
      },
      // Token Secret key
      process.env.TOKEN_SECRET,
      // Token expiry date
      {
        expiresIn: process.env.TOKEN_EXPIRY,
      }
    );
}

// Function for comparing the passwords while user-logging
userSchema.methods.comparePassword = async function(userPassword){
    const isMatched = await bcrypt.compare(userPassword,this.password);
    return isMatched;
}


const userModel = new mongoose.model("User",userSchema);

export default userModel;