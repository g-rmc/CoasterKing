import { NextFunction, Request, Response } from "express";

import { usersRepository } from "../repositories";

export async function validateAuth(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if(!auth) return res.status(401).send({ error: "Authorization empty" });

    if(!auth.includes("Bearer ")) return res.status(401).send({ error: "Invalid uthorization" });

    const token = auth.replace("Bearer ", "");
    res.locals.accessToken = token;

    try {
        const userObj = await usersRepository.getUserByToken(token);
        if(!userObj) return res.status(401).send({ error: "User not found" });
        res.locals.userId = userObj.id;
    } catch (error) {
        return res.status(401).send({ error: "Invalid token" });
    }

    next();
}
