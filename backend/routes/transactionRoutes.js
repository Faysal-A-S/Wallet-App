import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  transferFund,
  transactionByUser,
  depositFunds,
} from "../controllers/transactionController.js";

const transactionRouter = express.Router();
transactionRouter.post("/transfer-fund", authMiddleware, transferFund);
transactionRouter.post("/deposit-funds", authMiddleware, depositFunds);
transactionRouter.get(
  "/transaction-by-user",
  authMiddleware,
  transactionByUser
);
export default transactionRouter;
