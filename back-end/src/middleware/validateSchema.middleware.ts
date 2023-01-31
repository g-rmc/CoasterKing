import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";

export function validateSchema(schema: ObjectSchema, type: "body" | "params") {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req[type]) return res.status(400).send({ error: type+" empty" });

        const { error } = schema.validate(req[type], { abortEarly: false });
        if(!error) {
            next();
        } else {
            res.status(400).send(error.details.map(d => d.message));
        }
    };
}
