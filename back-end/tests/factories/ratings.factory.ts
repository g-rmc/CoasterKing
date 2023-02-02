import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/database";

export async function createRatings(number = 1, userId: number, coasterId: number) {
    while(number > 0) {
        const grade = +faker.random.numeric(1);
        await prisma.ratings.create({
            data: {
                userId,
                coasterId,
                grade
            }
        });
        number--;
    }
}

export async function createOneRatingWithGrade(grade: number, userId: number, coasterId: number) {
    await prisma.ratings.create({
        data: {
            userId,
            coasterId,
            grade
        }
    });
}
