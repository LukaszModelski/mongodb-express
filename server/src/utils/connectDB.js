import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectDB = () => {
  return mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PASSWORD}@firstcluster.0e7cs.mongodb.net/expenses?retryWrites=true&w=majority`
  );
};
