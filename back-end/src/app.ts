import express from "express";
import cors from "cors";

import userRouter from "./modules/users/users.router";
import coasterRouter from "./modules/coasters/coasters.routers";
import ridersRouter from "./modules/riders/riders.routers";

const app = express();
app
    .use(cors())
    .use(express.json())
    .get("/status", (_req, res) => res.send("Ok"))
    .use("/users", userRouter)
    .use("/coasters", coasterRouter)
    .use("/riders", ridersRouter);

export default app;
