const mongoose = require('mongoose');

const config = {
  database: 'expenses',
  env: 'localhost:27017'
}

export const connectDB = () => {
  return mongoose.connect('mongodb://'+ config.env + '/' + config.database);
}
