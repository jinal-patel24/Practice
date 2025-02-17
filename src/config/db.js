import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectDB = async () => {
    
    try {  
       await mongoose.connect(process.env.DB_URL)
        console.log("db connected successfully..");
    
    } catch (error) {
        console.log("connection fails");
        console.log(error)
        
    }
}
connectDB();

export default connectDB;
