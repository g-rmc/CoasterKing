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

async function getCoastersByUserId(userId: number) {
    return await prisma.riders.findMany({
        where: {
            userId
        },
        select: {
            coasters: true
        }, orderBy: {
            coasters: {
                parkName: "asc",
            }
        }
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
    getCoastersByUserId,
    getCoasterById,
};
