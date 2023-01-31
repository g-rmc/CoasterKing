import { PrismaClient } from "@prisma/client";

export async function cleanDb(prisma: PrismaClient) {
    await prisma.riders.deleteMany({});
    await prisma.favorites.deleteMany({});
    await prisma.ratings.deleteMany({});
    await prisma.users.deleteMany({});
    await prisma.coasters.deleteMany({});
}
