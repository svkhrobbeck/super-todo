import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import startApp from "./app.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
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
