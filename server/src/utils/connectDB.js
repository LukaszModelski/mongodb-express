const mongoose = require('mongoose');

const config = {
  database: 'expenses',
  env: {
    local: 'mongodb://localhost:27017/expenses',
    herouk: 'mongodb+srv://lukasz:lukasz123@firstcluster.0e7cs.mongodb.net/expenses?retryWrites=true&w=majority'
  },

}

export const connectDB = () => {
  return mongoose.connect(config.env.herouk);
}
