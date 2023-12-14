import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import startApp from "./app.js";
// routers
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js";
import { checkAuth } from "./middlewares/auth.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// api endpoints
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", checkAuth, userRouter);
app.use("/api/v1/todo", todoRouter);
app.use("*", (req, res) => {
  res.status(404).json({ message: "endpoint not found" });
});

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong, try again later";

  res.status(statusCode).json({ message });
});

// start application
startApp(app);
