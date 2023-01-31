import express from "express";

import { ridersController } from "./riders.controller";
import { validateAuth, validateSchema } from "../../middleware";
import { coasterIdSchema } from "../../schemas";

const router = express.Router();

router
    .use(validateAuth)
    .get("/riders/me", ridersController.getRidersMe)
    .get("/riders/:coasterId", validateSchema(coasterIdSchema, "params"), ridersController.getRider)
    .post("/riders/:coasterId", validateSchema(coasterIdSchema, "params"), ridersController.postRider)
    .delete("/riders/:coasterId", validateSchema(coasterIdSchema, "params"), ridersController.deleteRider);

export default router;
