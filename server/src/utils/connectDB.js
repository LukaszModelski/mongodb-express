import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const mongodbConfig = {
  database: 'expenses',
  env: {
    local: 'mongodb://localhost:27017/expenses',
    prod: `mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PASSWORD}@firstcluster.0e7cs.mongodb.net/expenses?retryWrites=true&w=majority`
  },

}

export const connectDB = () => {
  return mongoose.connect(mongodbConfig.env.prod);
}
