import { prisma } from "../../src/config/database";

export async function createRiders(number = 1, userId: number, coasterId: number) {
    while(number > 0) {
        await prisma.riders.create({
            data: {
                userId,
                coasterId
            }
        });
        number--;
    }
}
