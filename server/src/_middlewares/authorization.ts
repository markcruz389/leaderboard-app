import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const unauthorized = (res: Response) => {
    return res.status(403).json({ message: "Unauthorized" });
};

const authorization = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return unauthorized(res);
    }

    try {
        jwt.verify(token, process.env.SERVER_JWT_SECRET as string);
        next();
    } catch (error) {
        console.error(error);
        return unauthorized(res);
    }
};

export default authorization;
