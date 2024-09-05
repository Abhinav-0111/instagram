import express from "express";
import dotenv from "dotenv";
import Connection from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import router from "./route/route.js";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 8000;
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
    origin: process.env.URL,
    credentials: true,
};
app.use(cors(corsOptions));
app.use("/", router);

app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

server.listen(process.env.PORT, () => {
    Connection();
    console.log(`Server Running Successfully on port ${PORT}`);
});
