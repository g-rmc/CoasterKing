/* eslint-disable boundaries/no-private */
import { connectDb } from "../config/database";

const prisma = connectDb();

async function getAvgGradeByCoasterId(coasterId: number) {
    const { _avg } = await prisma.ratings.aggregate({
        where: { coasterId },
        _avg: {
            grade: true
        }
    });
    return { _avg: { grade: _avg.grade/10 } };
}

async function getRatingByCoasterAndUserId(coasterId: number, userId: number) {
    const rating = await prisma.ratings.findFirst({
        where: { 
            coasterId,
            userId
        },
    });
    if (!rating) return null;
    return { ...rating, grade: rating.grade/10 };
}

async function createUserRating(coasterId: number, userId: number, grade: number) {
    return await prisma.ratings.create({
        data: {
            userId,
            coasterId,
            grade: grade*10,
        }
    });
}

async function updateUserRatingById(id: number, grade: number) {
    return await prisma.ratings.update({
        where: {
            id
        },
        data: {
            grade: grade*10,
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
