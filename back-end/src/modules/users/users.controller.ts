import { Request, Response } from "express";

import { usersService } from "./users.service";
import { NewUserParams } from "../../repositories";

async function getUser(_req: Request, res: Response) {
    const { accessToken } = res.locals;
        
    try {
        const userObj = await usersService.getUserByAccessToken(accessToken);
        return res.send(userObj);
    } catch (error) {
        res.sendStatus(400);
    }
}

async function postUser(req: Request, res: Response) {
    const userObj: NewUserParams = req.body;

    try {
        const userIdObj = await usersService.createUpdateUser(userObj);
        res.send(userIdObj);
    } catch (error) {
        res.sendStatus(400);
    }
}

export const usersController = {
    getUser,
    postUser
};
