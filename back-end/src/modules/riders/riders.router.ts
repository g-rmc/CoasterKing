import express from "express";

import { ridersController } from "./riders.controller";
import { validateAuth, validateSchema } from "../../middleware";
import { coasterIdSchema } from "../../schemas";

const router = express.Router();

router
    .all("/*", validateAuth)
    .get("/me", ridersController.getRidersMe)
    .get("/:coasterId", validateSchema(coasterIdSchema, "params"), ridersController.getRider)
    .post("/:coasterId", validateSchema(coasterIdSchema, "params"), ridersController.postRider)
    .delete("/:coasterId", validateSchema(coasterIdSchema, "params"), ridersController.deleteRider);

export default router;
