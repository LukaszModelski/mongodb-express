import express from 'express';
import { connectDB } from './utils/connectDB';
import cors from 'cors';
import expenseRouter from "./resources/expense/expense.router";

const app = express();

const serverConfig = {
  port: process.env.PORT || 3000
}

app.use(cors())
app.use(express.json())

app.get('/api', (req, res) => {
  res.send({message: 'Api response'}).end();
})

app.use('/api/expense', expenseRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(serverConfig.port, () => {
      console.log(`Server running at http://localhost:${serverConfig.port}`);
    })
  } catch(err) {
    console.error(err);
  }
}

startServer();
