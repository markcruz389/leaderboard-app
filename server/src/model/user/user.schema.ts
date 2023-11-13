import { collection } from "typesaurus";

interface IUser {
    name: string;
    created_at: Date;
    updated_at: Date;
}

const users = collection<IUser>("USERS");

export { users };
