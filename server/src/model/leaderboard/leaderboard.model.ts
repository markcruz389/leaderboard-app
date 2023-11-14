import { add, get, where, order, query, limit, update, Doc } from "typesaurus";

import {
    leaderboardEntries,
    leaderboards,
    ILeaderboard,
    IEntry,
} from "./leaderboard.schema";
import { users } from "../user/user.schema";

interface IEntryResult extends IEntry {
    _id: string;
}

interface IRankedEntry extends IEntry {
    rank: number;
}

interface ILeaderboardResult extends ILeaderboard {
    _id: string;
    entries: IRankedEntry[];
}

const DEFAULT_PER_PAGE_VALUE = 10;
const DEFAULT_PAGE_VALUE = 1;

const addEntry = async (
    userId: string,
    leaderboardId: string,
    score: number
): Promise<IEntryResult | undefined> => {
    try {
        const userDoc = await get(users, userId);
        if (!userDoc) {
            return;
        }

        const leaderboardEntriesCollection = leaderboardEntries(leaderboardId);
        const entry = {
            score,
            user_id: userId,
            scored_at: new Date(),
            name: userDoc.data.name,
        };
        const entryRef = await add(leaderboardEntriesCollection, entry);

        return { ...entry, _id: entryRef.id };
    } catch (error) {
        console.error(error);
        return;
    }
};

const getPagedEntries = async (
    leaderboardId: string,
    per_page: number,
    page: number
): Promise<IRankedEntry[]> => {
    const leaderboardEntriesCollection = leaderboardEntries(leaderboardId);
    const totalCount = per_page * page;
    let rank = page - 1;

    let pagedDocs: Doc<IEntry>[];
    pagedDocs = await query(leaderboardEntriesCollection, [
        order("score", "desc"),
        order("scored_at", "asc"),
        limit(totalCount),
    ]);

    if (pagedDocs.length === 0) {
        return [];
    }

    if (page > 1) {
        const startIndex = (page - 1) * per_page;
        const endIndex = startIndex + per_page;

        pagedDocs = pagedDocs.slice(startIndex, endIndex);
        rank = per_page;
    }

    const rankedEntries = pagedDocs.map((doc) => ({
        ...doc.data,
        rank: rank++,
    }));

    return rankedEntries;
};

const getLeaderboard = async (
    leaderboardId: string,
    per_page: number = DEFAULT_PER_PAGE_VALUE,
    page: number = DEFAULT_PAGE_VALUE
): Promise<ILeaderboardResult | undefined> => {
    const leaderboardDoc = await get(leaderboards, leaderboardId);
    if (!leaderboardDoc) {
        return;
    }

    const entries = await getPagedEntries(leaderboardId, per_page, page);
    const result = {
        _id: leaderboardId,
        name: leaderboardDoc.data.name,
        entries,
    };

    return result;
};

const addLeaderboard = async (name: string) => {
    return await add(leaderboards, { name });
};

const updateLeaderboardEntryScore = async (
    leaderboardId: string,
    userId: string,
    scoreToAdd: number
) => {
    const leaderboardEntriesCollection = leaderboardEntries(leaderboardId);
    const entryDocs = await query(leaderboardEntriesCollection, [
        where("user_id", "==", userId),
        limit(1),
    ]);

    if (entryDocs.length === 0) {
        return await addEntry(userId, leaderboardId, scoreToAdd);
    }

    const entryDoc = entryDocs[0];
    const data = {
        score: entryDoc.data.score + scoreToAdd,
        scored_at: new Date(),
    };
    await update(leaderboardEntriesCollection, entryDoc.ref.id, data);

    return {
        ...data,
        _id: entryDoc.ref.id,
        user_id: userId,
        name: entryDoc.data.name,
    };
};

export {
    getLeaderboard,
    addLeaderboard,
    updateLeaderboardEntryScore,
    IEntryResult,
    ILeaderboardResult,
};
