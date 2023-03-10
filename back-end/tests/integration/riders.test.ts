import supertest from "supertest";
import { faker } from "@faker-js/faker";

import app from "../../src/app";
import { connectDb } from "../../src/config/database";
import { cleanDb } from "../helpers";
import { createUser, createCoaster, createRiders, createFavorites, createRatings } from "../factories";

const server = supertest(app);
const prisma = connectDb();

beforeEach(async () => {
    await cleanDb(prisma);
});

afterAll(async () => {
    await prisma?.$disconnect();
});

describe("GET /riders/me", () => {
    it ("should respond with status 401 when no token is given", async () => {
        const response = await server.get("/riders/me");

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when invalid token", async () => {
        const invalidToken = faker.random.alphaNumeric(5);

        const response = await server.get("/riders/me").set("Authorization", invalidToken);

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when no user found", async () => {
        const accessToken = faker.random.alphaNumeric(30);

        const response = await server.get("/riders/me").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(401);
    });

    describe("when token is valid", () => {
        it("should respond with status 200 and count 0 when no coasters rided", async () => {
            const createdUser = await createUser();

            const response = await server.get("/riders/me").set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ userCoastersCount: 0 });
        });

        it("should respond with status 200 and correct count of coasters rided", async () => {
            const createdUser = await createUser();
            const coasterObj = await createCoaster();

            const randomNum = +faker.random.numeric(2);
            await createRiders(randomNum, createdUser.id, coasterObj.id);

            const userCoastersCount = await prisma.riders.count({
                where: { userId: createdUser.id }
            });

            const response = await server.get("/riders/me").set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ userCoastersCount: userCoastersCount });
        });
    });
});

describe("GET /riders/ranking", () => {
    it ("should respond with status 401 when no token is given", async () => {
        const response = await server.get("/riders/ranking");

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when invalid token", async () => {
        const invalidToken = faker.random.alphaNumeric(5);

        const response = await server.get("/riders/ranking").set("Authorization", invalidToken);

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when no user found", async () => {
        const accessToken = faker.random.alphaNumeric(30);

        const response = await server.get("/riders/ranking").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(401);
    });

    describe("when token is valid", () => {
        it("should respond with status 200 and empty array when no riders", async () => {
            const createdUser = await createUser();

            const response = await server.get("/riders/ranking").set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        it("should respond with status 200 and correct count of coasters rided", async () => {
            const createdUser1 = await createUser();
            const createdUser2 = await createUser();
            const createdUser3 = await createUser();
            const coasterObj = await createCoaster();

            await createRiders(10, createdUser1.id, coasterObj.id);
            await createRiders(20, createdUser2.id, coasterObj.id);
            await createRiders(6, createdUser3.id, coasterObj.id);

            const usersRankingRaw = await prisma.riders.groupBy({
                by: ["userId"],
                _count: {
                    coasterId: true,
                },
                orderBy: {
                    _count: {
                        coasterId: "desc",
                    }
                }
            });

            const usersRanking: { userId: number, ranking: number, photoURL: string, displayName: string, credits: number }[] = [];

            for (let i = 1; i <= usersRankingRaw.length; i++) {
                const userData = await prisma.users.findUnique({
                    where: {
                        id: usersRankingRaw[i-1].userId,
                    },
                    select: {
                        photoURL: true,
                        displayName: true,
                    }
                });

                usersRanking.push({
                    userId: usersRankingRaw[i-1].userId,
                    ranking: i,
                    photoURL: userData.photoURL,
                    displayName: userData.displayName.split(" ")[0],
                    credits: usersRankingRaw[i-1]._count.coasterId
                });
            }

            const response = await server.get("/riders/ranking").set("Authorization", `Bearer ${createdUser1.accessToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(usersRanking);
        });
    });
});

describe("GET /riders/:coasterId", () => {
    it ("should respond with status 401 when no token is given", async () => {
        const response = await server.get("/riders/1");

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when invalid token", async () => {
        const invalidToken = faker.random.alphaNumeric(5);

        const response = await server.get("/riders/1").set("Authorization", invalidToken);

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when no user found", async () => {
        const accessToken = faker.random.alphaNumeric(30);

        const response = await server.get("/riders/1").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(401);
    });

    describe("when token is valid", () => {
        it("should respond with status 400 when invalid CoasterId format", async () => {
            const createdUser = await createUser();
            const invalidParam = faker.random.alpha(3);

            const response = await server.get(`/riders/${invalidParam}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(400);
        });

        it("should respond with status 404 when CoasterId not found", async () => {
            const createdUser = await createUser();
            const coasterObj = await createCoaster();

            const response = await server.get(`/riders/${coasterObj.id+1}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(404);
        });

        describe("when coasterId is valid", () => {
            it("should respond with status 200 and rideStatus false if never rided", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();
    
                const response = await server.get(`/riders/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);
    
                expect(response.status).toBe(200);
                expect(response.body).toEqual({ rideStatus: false });
            });

            it("should respond with status 200 and rideStatus true if already rided", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();

                await createRiders(1, createdUser.id, coasterObj.id);
    
                const response = await server.get(`/riders/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);
    
                expect(response.status).toBe(200);
                expect(response.body).toEqual({ rideStatus: true });
            });
        });
    });
});

describe("POST /riders/:coasterId", () => {
    it ("should respond with status 401 when no token is given", async () => {
        const response = await server.post("/riders/1");

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when invalid token", async () => {
        const invalidToken = faker.random.alphaNumeric(5);

        const response = await server.post("/riders/1").set("Authorization", invalidToken);

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when no user found", async () => {
        const accessToken = faker.random.alphaNumeric(30);

        const response = await server.post("/riders/1").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(401);
    });

    describe("when token is valid", () => {
        it("should respond with status 400 when invalid CoasterId format", async () => {
            const createdUser = await createUser();
            const invalidParam = faker.random.alpha(3);

            const response = await server.post(`/riders/${invalidParam}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(400);
        });

        it("should respond with status 404 when CoasterId not found", async () => {
            const createdUser = await createUser();
            const coasterObj = await createCoaster();

            const response = await server.post(`/riders/${coasterObj.id+1}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(404);
        });

        describe("when coasterId is valid", () => {
            it("should respond with status 400 if already has this entry in database", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();

                await createRiders(1, createdUser.id, coasterObj.id);
    
                const response = await server.post(`/riders/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

                const verifyEntry = await prisma.riders.count({
                    where: {
                        userId: createdUser.id,
                        coasterId: coasterObj.id,
                    }
                });
    
                expect(response.status).toBe(400);
                expect(verifyEntry).toBe(1);
            });

            it("should respond with status 201 and register one entry in database", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();
    
                const response = await server.post(`/riders/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

                const verifyEntry = await prisma.riders.count({
                    where: {
                        userId: createdUser.id,
                        coasterId: coasterObj.id,
                    }
                });
    
                expect(response.status).toBe(201);
                expect(verifyEntry).toBe(1);
            });
        });
    });
});

describe("DELETE /riders/:coasterId", () => {
    it ("should respond with status 401 when no token is given", async () => {
        const response = await server.delete("/riders/1");

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when invalid token", async () => {
        const invalidToken = faker.random.alphaNumeric(5);

        const response = await server.delete("/riders/1").set("Authorization", invalidToken);

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when no user found", async () => {
        const accessToken = faker.random.alphaNumeric(30);

        const response = await server.delete("/riders/1").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(401);
    });

    describe("when token is valid", () => {
        it("should respond with status 400 when invalid CoasterId format", async () => {
            const createdUser = await createUser();
            const invalidParam = faker.random.alpha(3);

            const response = await server.delete(`/riders/${invalidParam}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(400);
        });

        it("should respond with status 404 when CoasterId not found", async () => {
            const createdUser = await createUser();
            const coasterObj = await createCoaster();

            const response = await server.delete(`/riders/${coasterObj.id+1}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(404);
        });

        it("should respond with status 404 when riders entry not found", async () => {
            const createdUser = await createUser();
            const coasterObj = await createCoaster();

            const response = await server.delete(`/riders/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(404);
        });

        describe("when coasterId is valid", () => {
            it("should respond with status 200 and clear rider, rating and favorite entry for userId and coasterId", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();

                await createRiders(1, createdUser.id, coasterObj.id);
                await createRatings(1, createdUser.id, coasterObj.id);
                await createFavorites(1, createdUser.id, coasterObj.id);
    
                const response = await server.delete(`/riders/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

                const verifyEntry1 = await prisma.riders.count({
                    where: {
                        userId: createdUser.id,
                        coasterId: coasterObj.id,
                    }
                });

                const verifyEntry2 = await prisma.ratings.count({
                    where: {
                        userId: createdUser.id,
                        coasterId: coasterObj.id,
                    }
                });

                const verifyEntry3 = await prisma.favorites.count({
                    where: {
                        userId: createdUser.id,
                        coasterId: coasterObj.id,
                    }
                });
    
                expect(response.status).toBe(200);
                expect(verifyEntry1).toBe(0);
                expect(verifyEntry2).toBe(0);
                expect(verifyEntry3).toBe(0);
            });
        });
    });
});
