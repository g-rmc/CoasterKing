import { connectDb } from "../../src/config/database";

const prisma = connectDb();

export async function createFavorites(number = 1, userId: number, coasterId: number) {
    while(number > 0) {
        await prisma.favorites.create({
            data: {
                userId,
                coasterId
            }
        });
        number--;
    }
}
