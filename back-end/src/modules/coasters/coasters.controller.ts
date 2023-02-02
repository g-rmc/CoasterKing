import { Request, Response } from "express";

import { coastersService } from "./coasters.service";

async function getCoasters(_req: Request, res: Response) {    
    try {
        const coastersArr = await coastersService.getCoastersListWithAvgCountInfo();
        res.send(coastersArr);
    } catch (error) {
        res.sendStatus(400);
    }
}

async function getCoastersMe(_req: Request, res: Response) {
    const userId = +res.locals.userId;

    try {
        const coastersArr = await coastersService.getCoastersListByUser(userId);
        res.send(coastersArr);
    } catch (error) {
        res.sendStatus(400);
    }
}

export const coastersController = {
    getCoasters,
    getCoastersMe
};
