import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { coasters } from "@prisma/client";

import app from "../../src/app";
import { connectDb } from "../../src/config/database";
import { cleanDb } from "../helpers";
import { createUser, createCoaster, createRiders, createFavorites, createRatings } from "../factories";

const server = supertest(app);
const prisma = connectDb();

beforeEach(async () => {
    await cleanDb(prisma);
});

describe("GET /coasters", () => {
    it ("should respond with status 401 when no token is given", async () => {
        const response = await server.get("/coasters");

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when invalid token", async () => {
        const invalidToken = faker.random.alphaNumeric(5);

        const response = await server.get("/coasters").set("Authorization", invalidToken);

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when no user found", async () => {
        const accessToken = faker.random.alphaNumeric(30);

        const response = await server.get("/coasters").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(401);
    });

    describe("when token is valid", () => {
        it("should respond with status 200 and empty array when no coasters found", async () => {
            const createdUser = await createUser();

            const response = await server.get("/coasters").set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        it("should respond with status 200 and coasters array with riders, favorites and average ratings", async () => {
            const createdUser = await createUser();
            const coasterObj = await createCoaster();

            const randomNum = +faker.random.numeric(1);
            await createRiders(randomNum, createdUser.id, coasterObj.id);
            await createFavorites(randomNum, createdUser.id, coasterObj.id);
            await createRatings(randomNum, createdUser.id, coasterObj.id);

            const coastersList = await prisma.coasters.findMany({
                include: {
                    _count: {
                        select: {
                            riders: true,
                            favorites: true
                        },
                    },
                }
            });

            const fullCoasterInfo: Partial<coasters & {_count: { riders: number, favorites: number }, _avg: { grade: number}}> [] = [];

            for(let i = 0; i < coastersList.length; i++) {
                const coasterRatings = await prisma.ratings.aggregate({
                    where: { coasterId: coastersList[i].id },
                    _avg: {
                        grade: true
                    }
                });
                fullCoasterInfo.push({ ...coastersList[i], _avg: { grade: Math.round(coasterRatings._avg.grade/10) } });
            }
            
            const response = await server.get("/coasters").set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(fullCoasterInfo);
        });
    });
});

describe("GET /coasters/me", () => {
    it ("should respond with status 401 when no token is given", async () => {
        const response = await server.get("/coasters/me");

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when invalid token", async () => {
        const invalidToken = faker.random.alphaNumeric(5);

        const response = await server.get("/coasters/me").set("Authorization", invalidToken);

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when no user found", async () => {
        const accessToken = faker.random.alphaNumeric(30);

        const response = await server.get("/coasters/me").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(401);
    });

    describe("when token is valid", () => {
        it("should respond with status 200 and empty array when no coasters found", async () => {
            const createdUser = await createUser();

            const response = await server.get("/coasters/me").set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        it("should respond with status 200 and coasters array for user", async () => {
            const createdUser = await createUser();
            const coasterObj = await createCoaster();

            await createRiders(1, createdUser.id, coasterObj.id);
            
            const response = await server.get("/coasters/me").set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual([coasterObj]);
        });
    });
});
