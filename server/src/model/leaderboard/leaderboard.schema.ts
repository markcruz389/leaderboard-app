import { collection, subcollection } from "typesaurus";

interface ILeaderboard {
    name: string;
}

interface IEntry {
    score: number;
    user_id: string;
    name: string;
    scored_at: Date;
}

const leaderboards = collection<ILeaderboard>("LEADERBOARDS");
const leaderboardEntries = subcollection<IEntry, ILeaderboard>(
    "entries",
    leaderboards
);

export { leaderboards, leaderboardEntries, ILeaderboard, IEntry };
