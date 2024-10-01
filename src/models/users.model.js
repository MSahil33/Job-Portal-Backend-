import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";


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
    },
    location:{
        type:String,
        default:"India"
    }
},{ timestamps: true })

// Encrypting the user password before saving into the database using bcrpytJS library
// Middleware to hash the password before saving the user document using the bcrypt
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10); // Here 10 is the length of salt text
    }
    next();
})
const userModel = new mongoose.model("User",userSchema);

export default userModel;