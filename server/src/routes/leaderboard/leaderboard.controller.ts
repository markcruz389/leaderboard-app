import { Request, Response } from "express";
import {
    IEntryResult,
    getLeaderboard,
    addLeaderboard,
    updateLeaderboardEntryScore,
} from "../../model/leaderboard/leaderboard.model";

type CreateLeaderboardResponse = {
    _id: string;
    name: string;
};

type UpdateLeaderboardEntryScoreResponse = {
    entry: {
        _id: string;
        board_id: string;
        score: number;
        scored_at: string;
        user_id: string;
    };
};

const httpGetLeaderboard = async (req: Request, res: Response) => {
    const leaderboardId = req.params._id.trim();
    if (!leaderboardId) {
        res.status(400).json({ error: "Invalid parameters" });
    }

    const params = req.query;
    const per_page = Number(params.per_page);
    const page = Number(params.page);

    const data = await getLeaderboard(leaderboardId, per_page, page);

    console.log(params);

    return res.status(200).json(data);
};

const httpPostLeaderboard = async (req: Request, res: Response) => {
    const data = req.body;
    const name = data.name.trim() as string;

    if (!name) {
        return res.status(400).json({ error: "Name required" });
    }

    const userRef = await addLeaderboard(name);
    const user: CreateLeaderboardResponse = {
        _id: userRef.id,
        name,
    };

    return res.status(201).json(user);
};

const httpPostUpdateLeaderboardEntryScore = async (
    req: Request,
    res: Response
) => {
    const scoreToAdd = req.body.score_to_add;
    if (isNaN(scoreToAdd)) {
        res.status(400).json({ error: "Score is not a number" });
    }

    const leaderboardId = req.params._id.trim();
    const userId = req.params.user_id.trim();

    if (!leaderboardId || !userId) {
        res.status(400).json({ error: "Invalid parameters" });
    }

    const data = await updateLeaderboardEntryScore(
        leaderboardId,
        userId,
        Number(scoreToAdd)
    );

    if (!data) {
        res.status(400).json({ error: "Update failed" });
    }

    const { _id, score, user_id, scored_at } = data as IEntryResult;
    const response: UpdateLeaderboardEntryScoreResponse = {
        entry: {
            _id,
            user_id,
            score,
            scored_at: scored_at.toISOString(),
            board_id: leaderboardId,
        },
    };

    return res.status(200).json(response);
};

export {
    httpGetLeaderboard,
    httpPostLeaderboard,
    httpPostUpdateLeaderboardEntryScore,
};
