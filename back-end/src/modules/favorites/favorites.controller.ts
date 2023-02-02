import { Request, Response } from "express";

import { favoritesService } from "./favorites.service";

async function getRider(req: Request, res: Response) {
    const userId = +res.locals.userId;
    const coasterId = +req.params.coasterId;

    try {
        const favorite = await favoritesService.getFavoritedOrNot(userId, coasterId);
        res.status(200).send({ favoriteStatus: favorite });
    } catch (error) {
        if(error.message === "coasterId not found") return res.status(404).send(error.message);
        res.sendStatus(400);
    }
}

async function postRider(req: Request, res: Response) {
    const userId = +res.locals.userId;
    const coasterId = +req.params.coasterId;

    try {
        await favoritesService.postFavoriteEntry(userId, coasterId);
        res.sendStatus(201);
    } catch (error) {
        if(error.message === "coasterId not found") return res.status(404).send(error.message);
        res.sendStatus(400);
    }
}

async function deleteRider(req: Request, res: Response) {
    const userId = +res.locals.userId;
    const coasterId = +req.params.coasterId;

    try {
        await favoritesService.deleteFavoriteEntry(userId, coasterId);
        res.sendStatus(200);
    } catch (error) {
        if(error.message === "coasterId not found" || error.message === "favorite entry not found") return res.status(404).send(error.message);
        res.sendStatus(400);
    }
}

export const favoritesController = {
    getRider, postRider, deleteRider
};
