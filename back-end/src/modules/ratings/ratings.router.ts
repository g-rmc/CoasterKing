import express from "express";

import { ratingsController } from "./ratings.controller";
import { validateAuth, validateSchema } from "../../middleware";
import { coasterIdSchema, gradeSchema } from "../../schemas";

const router = express.Router();

router
    .all("/*", validateAuth)
    .get("/:coasterId", validateSchema(coasterIdSchema, "params"), ratingsController.getUserRating)
    .post("/:coasterId", validateSchema(coasterIdSchema, "params"), validateSchema(gradeSchema, "body"), ratingsController.postUserRating)
    .delete("/:coasterId", validateSchema(coasterIdSchema, "params"), ratingsController.deleteUserRating);

export default router;
