import http from "node:http";

import app from "./app";
import { initializeFirebase } from "./config/firebase";

initializeFirebase();

const PORT = process.env.SERVER_PORT;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening to port ${PORT}...`));
