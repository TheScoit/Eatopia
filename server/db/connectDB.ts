import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        // ! if you put this any after words then it has some values its not empty
        console.log('Database Connected');
        
    } catch (error) {
        console.log("Something is wrong" ,error);
    }
}

export default connectDB;