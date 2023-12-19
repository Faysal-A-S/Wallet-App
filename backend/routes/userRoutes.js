import express from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
  verifyUser,
  updateUser,
  getAllUsers,
  updateUserStatus,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/update", authMiddleware, updateUser);
UserRouter.post("/update-user-status", authMiddleware, updateUserStatus);
UserRouter.get("/user-info", authMiddleware, getUserInfo);
UserRouter.get("/get-all-users", authMiddleware, getAllUsers);
UserRouter.get(`/verify-user/:id`, authMiddleware, verifyUser);
export default UserRouter;
