/* eslint-disable boundaries/no-private */
import { connectDb } from "../config/database";

const prisma = connectDb();

async function getFavoritesByUserAndCoasterId(userId: number, coasterId: number) {
    return await prisma.favorites.findFirst({
        where: {
            userId,
            coasterId
        }
    });
}

async function createFavoritesByUserAndCoasterId(userId: number, coasterId: number) {
    return await prisma.favorites.create({
        data: {
            userId,
            coasterId
        }
    });
}

async function deleteFavoritesByCoasterAndUserId(userId: number, coasterId: number) {
    return await prisma.favorites.deleteMany({
        where: { 
            coasterId,
            userId
        },
    });
}

export const favoritesRepository = {
    getFavoritesByUserAndCoasterId,
    createFavoritesByUserAndCoasterId,
    deleteFavoritesByCoasterAndUserId
};
