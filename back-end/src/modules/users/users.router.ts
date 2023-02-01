import express from "express";

import { usersController } from "./users.controller";
import { validateSchema, validateAuth } from "../../middleware";
import { newUserSchema } from "../../schemas/index";

const router = express.Router();

router
    .get("/", validateAuth, usersController.getUser)
    .post("/", validateSchema(newUserSchema, "body"), usersController.postUser);

export default router;
