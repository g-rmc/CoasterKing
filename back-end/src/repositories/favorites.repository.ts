/* eslint-disable boundaries/no-private */
import { connectDb } from "../config/database";

const prisma = connectDb();

async function deleteFavoritesByCoasterAndUserId(userId: number, coasterId: number) {
    return await prisma.favorites.deleteMany({
        where: { 
            coasterId,
            userId
        },
    });
}

export const favoritesRepository = {
    deleteFavoritesByCoasterAndUserId
};
