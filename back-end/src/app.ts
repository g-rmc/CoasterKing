import express from "express";
import cors from "cors";

import userRouter from "./modules/users/users.router";
import coasterRouter from "./modules/coasters/coasters.router";
import ridersRouter from "./modules/riders/riders.router";
import ratingsRouter from "./modules/ratings/ratings.router";

const app = express();
app
    .use(cors())
    .use(express.json())
    .get("/status", (_req, res) => res.send("Ok"))
    .use("/users", userRouter)
    .use("/coasters", coasterRouter)
    .use("/riders", ridersRouter)
    .use("/ratings", ratingsRouter);

export default app;
