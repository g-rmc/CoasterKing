import { connectDb } from "../../src/config/database";

const prisma = connectDb();

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
