import { Request, Response } from "express";

import { ridersService } from "./riders.service";

async function getRidersMe(_req: Request, res: Response) {
    const userId = Number(res.locals.userId);

    try {
        const userCount = await ridersService.getCoastersNumberByUser(userId);
        res.send(userCount);
    } catch (error) {
        res.sendStatus(400);
    }
}

async function getRider(req: Request, res: Response) {
    const userId = Number(res.locals.userId);
    const coasterId = Number(req.params.coasterId);

    try {
        const rided = await ridersService.getRidedOrNot(userId, coasterId);
        res.status(200).send({ rideStatus: rided });
    } catch (error) {
        if(error.message === "coasterId not found") return res.status(404).send(error.message);
        res.sendStatus(400);
    }
}

async function postRider(req: Request, res: Response) {
    const userId = Number(res.locals.userId);
    const coasterId = Number(req.params.coasterId);

    try {
        await ridersService.postRiderEntry(userId, coasterId);
        res.sendStatus(201);
    } catch (error) {
        if(error.message === "coasterId not found") return res.status(404).send(error.message);
        res.sendStatus(400);
    }
}

async function deleteRider(req: Request, res: Response) {
    const userId = Number(res.locals.userId);
    const coasterId = Number(req.params.coasterId);

    try {
        await ridersService.deleteRiderEntry(userId, coasterId);
        res.sendStatus(200);
    } catch (error) {
        if(error.message === "coasterId not found" || error.message === "rider entry not found") return res.status(404).send(error.message);
        res.sendStatus(400);
    }
}

export const ridersController = {
    getRidersMe, getRider, postRider, deleteRider
};
