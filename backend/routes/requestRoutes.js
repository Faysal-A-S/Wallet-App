import express from "express";
import {
  getRequestsByUser,
  sendRequest,
  updateRequest,
} from "../controllers/requestController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const requestRouter = express.Router();

requestRouter.get("/get-requests-by-user", authMiddleware, getRequestsByUser);
requestRouter.post("/send-request", authMiddleware, sendRequest);
requestRouter.post("/update-request", authMiddleware, updateRequest);
export default requestRouter;
