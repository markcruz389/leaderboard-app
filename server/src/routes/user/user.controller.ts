import { Request, Response } from "express";
import { getUser, addUser } from "../../model/user/user.model";

type UserResponse = {
    user: {
        _id: string;
        name: string;
    };
};

const httpGetUser = async (req: Request, res: Response) => {
    const id = req.params._id;

    if (!id.trim()) {
        return res.status(400).json({ error: "User Id is required" });
    }

    const userDoc = await getUser(id);
    if (!userDoc) {
        return res.status(200).json({ message: "User not found" });
    }

    const response: UserResponse = {
        user: {
            _id: id,
            name: userDoc.data.name,
        },
    };

    return res.status(200).json(response);
};

const httpPostUser = async (req: Request, res: Response) => {
    const data = req.body;
    const name = data.name.trim() as string;

    if (!name) {
        return res.status(400).json({ error: "Name required" });
    }

    const userRef = await addUser(name);
    const response: UserResponse = {
        user: {
            _id: userRef.id,
            name,
        },
    };

    return res.status(201).json(response);
};

export { httpGetUser, httpPostUser };
