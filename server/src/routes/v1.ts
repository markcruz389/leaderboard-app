import express from "express";

import userRouter from "./user/user.router";
import adminRouter from "./admin/admin.router";
import leaderboardRouter from "./leaderboard/leaderboard.router";

const api = express.Router();

api.use("/admin", adminRouter);
api.use("/user", userRouter);
api.use("/leaderboard", leaderboardRouter);

export default api;
