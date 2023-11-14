import express, { Request, Response, NextFunction, Errback } from "express";
import cookieParser from "cookie-parser";

import api from "./routes/v1";

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.get("/", (req, res) => {
//     return res.json(serviceAccount);
// });

app.use("/api/v1", api);

app.use((error: Errback, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
});

export default app;
