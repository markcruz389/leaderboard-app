import express from "express";
import {
    httpGetLeaderboard,
    httpPostUpdateLeaderboardEntryScore,
} from "./leaderboard.controller";

const leaderboardRouter = express.Router();

leaderboardRouter.get("/:_id", httpGetLeaderboard);
leaderboardRouter.put(
    "/:_id/user/:user_id/add_score",
    httpPostUpdateLeaderboardEntryScore
);

export default leaderboardRouter;
