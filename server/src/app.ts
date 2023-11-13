import express from "express";
import api from "./routes/v1";

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//     return res.json(serviceAccount);
// });

app.use("/api/v1", api);

export default app;
