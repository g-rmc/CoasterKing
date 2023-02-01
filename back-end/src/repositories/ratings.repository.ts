/* eslint-disable boundaries/no-private */
import { connectDb } from "../config/database";

const prisma = connectDb();

async function getAvgGradeByCoasterId(coasterId: number) {
    return await prisma.ratings.aggregate({
        where: { coasterId },
        _avg: {
            grade: true
        }
    });
}

async function getRatingByCoasterAndUserId(coasterId: number, userId: number) {
    return await prisma.ratings.findFirst({
        where: { 
            coasterId,
            userId
        },
    });
}

async function createUserRating(coasterId: number, userId: number, grade: number) {
    return await prisma.ratings.create({
        data: {
            userId,
            coasterId,
            grade,
        }
    });
}

async function updateUserRatingById(id: number, grade: number) {
    return await prisma.ratings.update({
        where: {
            id
        },
        data: {
            grade
        }
    });
}

async function deleteRatingByCoasterAndUserId(coasterId: number, userId: number) {
    return await prisma.ratings.deleteMany({
        where: { 
            coasterId,
            userId
        },
    });
}

export const ratingsRepository = {
    getAvgGradeByCoasterId,
    getRatingByCoasterAndUserId,
    createUserRating,
    updateUserRatingById,
    deleteRatingByCoasterAndUserId
};
