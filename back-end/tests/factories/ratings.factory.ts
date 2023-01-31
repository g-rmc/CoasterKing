import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/database";

export async function createRatings(number = 1, userId: number, coasterId: number) {
    while(number > 0) {
        const grade = Number(faker.random.numeric(2));
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
