import express from "express";

import { coastersController } from "./coasters.controller";
import { validateAuth } from "../../middleware";

const router = express.Router();

router
    .all("/", validateAuth)
    .get("/", coastersController.getCoasters);

export default router;
