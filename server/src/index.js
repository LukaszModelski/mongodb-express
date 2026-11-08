import "./instrument";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./utils/connectDB";
import cors from "cors";
import expenseRouter from "./resources/expense/expense.router";
import userRouter from "./resources/user/user.router";
import { verifyJWT } from "./middleware/verifyJWT";
import { requestLogger } from "./middleware/requestLogger";
import { logError } from "./utils/logger";
import * as Sentry from "@sentry/node";

const app = express();

const serverConfig = {
  port: process.env.PORT || 3000,
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send({ message: "Application test response" }).end();
});

app.use("/api/expense", verifyJWT, expenseRouter);
app.use("/api/user", userRouter);

// Must be after all routes: reports errors passed to next(err) to Sentry.
Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(serverConfig.port, () => {
      console.log(`Server is running at port ${serverConfig.port}`);
    });
  } catch (err) {
    logError(err, "server.start");
  }
};

startServer();
