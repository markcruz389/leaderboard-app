import {
    collection,
    subcollection,
    all,
    add,
    get,
    upset,
    ValueServerDate,
    where,
    order,
    startAfter,
    query,
    limit,
    ValueIncrement,
    value,
    UpdateValue,
    field,
    update,
    startAt,
    Doc,
} from "typesaurus";

import { leaderboardEntries, leaderboards, IEntry } from "./leaderboard.schema";
import { users } from "../user/user.schema";

interface IEntryResult extends IEntry {
    _id: string;
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

const getLeaderboard = async (
    leaderboardId: string,
    per_page: number = DEFAULT_PER_PAGE_VALUE,
    page: number = DEFAULT_PAGE_VALUE
) => {
    const leaderboardDoc = await get(leaderboards, leaderboardId);
    if (!leaderboardDoc) {
        return;
    }

    const leaderboardEntriesCollection = leaderboardEntries(leaderboardId);
    let docs: Doc<IEntry>[];
    let lastDocId: string;

    for (let i = 0; i < page; i++) {
        const _docs = await query(leaderboardEntriesCollection, [
            order("score", "desc"),
            order("scored_at", "asc"),
            limit(per_page),
        ]);

        lastDocId = _docs[i].ref.id;
    }

    return querys;
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
};
