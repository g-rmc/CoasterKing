import { Request, Response } from "express";

import { ratingsService } from "./ratings.service";

async function getUserRating(req: Request, res: Response) {
    const userId = +res.locals.userId;
    const coasterId = +req.params.coasterId;

    try {
        const rating = await ratingsService.getRating(userId, coasterId);
        if(!rating) { return res.send({ grade: null }); }
        res.send({ grade: rating.grade });
    } catch (error) {
        if(error.message === "coasterId not found") return res.status(404).send(error.message);
        res.sendStatus(400);
    }
}

async function postUserRating(req: Request, res: Response) {
    const userId = +res.locals.userId;
    const coasterId = +req.params.coasterId;
    const grade = +req.body.grade;

    try {
        await ratingsService.createOrUpdateRatings(userId, coasterId, grade);
        res.sendStatus(200);
    } catch (error) {
        if(error.message === "coasterId not found") return res.status(404).send(error.message);
        res.sendStatus(400);
    }
}

async function deleteUserRating(req: Request, res: Response) {
    const userId = +res.locals.userId;
    const coasterId = +req.params.coasterId;

    try {
        await ratingsService.deleteRating(userId, coasterId);
        res.sendStatus(200);
    } catch (error) {
        if(error.message === "coasterId not found") return res.status(404).send(error.message);
        res.sendStatus(400);
    }
}

export const ratingsController = {
    getUserRating,
    postUserRating,
    deleteUserRating
};
