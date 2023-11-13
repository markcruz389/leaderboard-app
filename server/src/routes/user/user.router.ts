import express from "express";
import { httpGetUser, httpPostUser } from "./user.controller";

const userRouter = express.Router();

userRouter.get("/:_id", httpGetUser);
userRouter.post("/", httpPostUser);

export default userRouter;
