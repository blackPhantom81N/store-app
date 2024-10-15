import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error", error?.message);
    process.exit(1); //Exit with failure: 0 means success
  }
};

export default connectToDatabase;
