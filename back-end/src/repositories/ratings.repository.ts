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

export const ratingsRepository = {
    getAvgGradeByCoasterId,
};
