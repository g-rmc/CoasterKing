import express from "express";

import { favoritesController } from "./favorites.controller";
import { validateAuth, validateSchema } from "../../middleware";
import { coasterIdSchema } from "../../schemas";

const router = express.Router();

router
    .all("/*", validateAuth)
    .get("/:coasterId", validateSchema(coasterIdSchema, "params"), favoritesController.getRider)
    .post("/:coasterId", validateSchema(coasterIdSchema, "params"), favoritesController.postRider)
    .delete("/:coasterId", validateSchema(coasterIdSchema, "params"), favoritesController.deleteRider);

export default router;
