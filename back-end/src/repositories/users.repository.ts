/* eslint-disable boundaries/no-private */
import { users } from "@prisma/client";
import { connectDb } from "../config/database";

const prisma = connectDb();

export type NewUserParams = Omit<users, "id">;

async function getUserByToken(accessToken: string) {
    return await prisma.users.findFirst({
        where: { accessToken }
    });
}

async function getUserPublicInfoById(userId: number) {
    return await prisma.users.findUnique({
        where: {
            id: userId,
        },
        select: {
            photoURL: true,
            displayName: true,
        }
    });
}

async function upsertUser(user: NewUserParams) {
    const createdUser = await prisma.users.upsert({
        where: {
            email: user.email,
        },
        update: user,
        create: user
    });
    return { userId: createdUser.id };
}

export const usersRepository = {
    getUserByToken,
    getUserPublicInfoById,
    upsertUser,
};
