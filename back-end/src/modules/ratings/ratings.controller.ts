import { Request, Response } from "express";

import { ratingsService } from "./ratings.service";

async function postUserRating(req: Request, res: Response) {
    const userId = Number(res.locals.userId);
    const coasterId = Number(req.params.coasterId);
    const grade = Number(req.body.grade);

    try {
        await ratingsService.createOrUpdateRatings(userId, coasterId, grade);
        res.sendStatus(200);
    } catch (error) {
        if(error.message === "coasterId not found") return res.status(404).send(error.message);
        res.sendStatus(400);
    }
}

export const ratingsController = {
    postUserRating
};
