/* eslint-disable boundaries/no-private */
import { connectDb } from "../config/database";

const prisma = connectDb();

async function getCoastersCountByUserId(userId: number) {
    return await prisma.riders.count({
        where: { userId: userId }
    });
}

async function getRidersGoupByUserId() {
    return await prisma.riders.groupBy({
        by: ["userId"],
        _count: {
            coasterId: true,
        },
        orderBy: {
            _count: {
                coasterId: "desc",
            }
        }
    });
}

async function getRiderEntryByUserAndCoasterId(userId: number, coasterId: number) {
    return await prisma.riders.findFirst({
        where: {
            userId,
            coasterId
        }
    });
}

async function createRiderEntryByUserAndCoasterId(userId: number, coasterId: number) {
    return await prisma.riders.create({
        data: {
            userId,
            coasterId
        }
    });
}

async function deleteRiderEntryByUserAndCoasterId(userId: number, coasterId: number) {
    return await prisma.riders.deleteMany({
        where: {
            coasterId,
            userId
        }
    });
}

export const ridersRepository = {
    getCoastersCountByUserId,
    getRidersGoupByUserId,
    getRiderEntryByUserAndCoasterId,
    createRiderEntryByUserAndCoasterId,
    deleteRiderEntryByUserAndCoasterId
};
