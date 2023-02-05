/* eslint-disable no-console */
import { coasters, PrismaClient, users } from "@prisma/client";
import { userData, coastersData } from "./seedData";

const prisma = new PrismaClient();

async function main() {
    //await cleanDb();

    //const userObj = await createUser();
    const coastersArr = await createCoasters();
    console.log(coastersArr);

    //await createRiders(userObj, coastersArr);
    //await createFavorites(userObj, coastersArr);
    //await createRatings(userObj, coastersArr);
}

async function cleanDb() {
    await prisma.riders.deleteMany({});
    await prisma.favorites.deleteMany({});
    await prisma.ratings.deleteMany({});
    await prisma.users.deleteMany({});
    await prisma.coasters.deleteMany({});
}

async function createUser() {
    return prisma.users.create({
        data: userData
    });
}

async function createCoasters() {
    await prisma.coasters.createMany({
        data: coastersData
    });
    return prisma.coasters.findMany();
}

async function createRiders(user: users, coasters: coasters[]) {
    coasters.forEach(async (coaster) => {
        await prisma.riders.create({
            data: {
                userId: user.id,
                coasterId: coaster.id,
            }
        });
    });
}

async function createFavorites(user: users, coasters: coasters[]) {
    for (let i = 0; i < coasters.length; i++) {
        if (i % 2 === 0) continue;
        await prisma.favorites.create({
            data: {
                userId: user.id,
                coasterId: coasters[i].id,
            }
        });
    }
}

async function createRatings(user: users, coasters: coasters[]) {
    coasters.forEach(async (coaster) => {
        await prisma.ratings.create({
            data: {
                userId: user.id,
                coasterId: coaster.id,
                grade: 40,
            }
        });
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
