import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import startApp from "./app";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// start application
startApp(app);
