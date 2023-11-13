import { add, get } from "typesaurus";
import { users } from "./user.schema";

const getUser = async (id: string) => {
    return await get(users, id);
};

const addUser = async (name: string) => {
    const currentDate = new Date();
    const data = {
        name,
        updated_at: currentDate,
        created_at: currentDate,
    };

    return await add(users, data);
};

export { getUser, addUser };
