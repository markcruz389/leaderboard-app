import http from "node:http";
import dotenv from "dotenv";

import app from "./app";
import { initializeFirebase } from "./config/firebase";

dotenv.config();
initializeFirebase();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening to port ${PORT}...`));
