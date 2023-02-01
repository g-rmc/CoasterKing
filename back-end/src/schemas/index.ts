import Joi from "joi";

import { NewUserParams } from "../repositories";

export const newUserSchema = Joi.object<NewUserParams>({
    email: Joi.string().email().required(),
    displayName: Joi.string().min(3).required(),
    accessToken: Joi.string().min(3).required(),
    photoURL: Joi.string().uri().required(),
    uid: Joi.string().min(3).required(),
});

export const coasterIdSchema = Joi.object<{coasterId: number}>({
    coasterId: Joi.number().min(1).required(),
});

export const gradeSchema = Joi.object<{grade: number}>({
    grade: Joi.number().min(0).max(50).required(),
});
