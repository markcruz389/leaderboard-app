import express from "express";

import { httpPostLeaderboard } from "../leaderboard/leaderboard.controller";
import authorization from "../../_middlewares/authorization";

const adminRouter = express.Router();

adminRouter.post("/leaderboard", authorization, httpPostLeaderboard);

export default adminRouter;
