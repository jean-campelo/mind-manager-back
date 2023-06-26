import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const server = express();
server
    .use(cors())
    .use(express.json());

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`))