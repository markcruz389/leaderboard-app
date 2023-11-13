import express from "express";
import { httpPostLeaderboard } from "../leaderboard/leaderboard.controller";

const adminRouter = express.Router();

adminRouter.post("/leaderboard", httpPostLeaderboard);

export default adminRouter;
