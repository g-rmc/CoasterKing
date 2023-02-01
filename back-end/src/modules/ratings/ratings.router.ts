import express from "express";

import { ratingsController } from "./ratings.controller";
import { validateAuth, validateSchema } from "../../middleware";
import { coasterIdSchema, gradeSchema } from "../../schemas";

const router = express.Router();

router
    .all("/*", validateAuth)
    .post("/:coasterId", validateSchema(coasterIdSchema, "params"), validateSchema(gradeSchema, "body"), ratingsController.postUserRating);

export default router;
