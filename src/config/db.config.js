import mongoose from "mongoose";
import colors from 'colors';


// Creating the connection to database(lOCAL MONGODB CONNECTION)
const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(`${process.env.MONGODB_LOCAL_URI}/${process.env.DB_NAME}`);
        console.log(`Database connected sucessfully on : ${process.env.MONGODB_LOCAL_URI}`.bgGreen.black.bold);
    }catch(err){
        console.log(`Error : ${err}`.bgRed.white.bold);
    }
}


// Creating the connection to database(CLOUD MONGODB CONNECTION)
// const connectDB = async () =>{
//     try{
//         const conn = await mongoose.connect(process.env.MONGODB_CLOUD_URI);
//         console.log(`Database connected sucessfully on : ${process.env.MONGODB_CLOUD_URI}`.bgGreen.black.bold);
//     }catch(err){
//         console.log(`Error : ${err}`.bgRed.white.bold);
//     }
// }

export default connectDB;