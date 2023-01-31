/* eslint-disable boundaries/no-private */
import { connectDb } from "../config/database";

const prisma = connectDb();

async function getCoastersWithCount() {
    return await prisma.coasters.findMany({
        include: {
            _count: {
                select: {
                    riders: true,
                    favorites: true,
                },
            },
        },
        orderBy: [{
            parkName: "asc",
        }, {
            name: "asc",
        }]
    });
}

async function getCoasterById(coasterId: number) {
    return await prisma.coasters.findUnique({
        where: {
            id: coasterId
        }
    });
}

export const coastersRepository = {
    getCoastersWithCount,
    getCoasterById
};
