import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import { Connection } from "./db/dbConfig.js";
import requestRouter from "./routes/requestRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";

const app = express();

app.use(express.json());
app.options("*", cors());
app.use(cors());
app.use("/api/users", UserRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/requests", requestRouter);
app.get("/", (req, res) => {
  res.send("Connected to wallet App backend");
});
const PORT = 9000;
Connection(process.env.DB_USERNAME, process.env.DB_PASSWORD);

app.listen(PORT, () => {
  console.log("server running");
});
