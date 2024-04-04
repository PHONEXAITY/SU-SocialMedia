import mongoose from "mongoose";

const connectDB = async () => {
    try{
      await mongoose.connect(process.env.MONGODB);
      console.log('Connect to MongoDb');
    }catch(error){
    console.error('MongoDB connect Error:' , error.message);
    process.exit(1);
    }
};

export default connectDB;