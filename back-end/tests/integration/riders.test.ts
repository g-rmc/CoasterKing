import supertest from "supertest";
import { faker } from "@faker-js/faker";

import app from "../../src/app";
import { connectDb } from "../../src/config/database";
import { cleanDb } from "../helpers";
import { createUser, createCoaster, createRiders } from "../factories";

const server = supertest(app);
const prisma = connectDb();

beforeEach(async () => {
    await cleanDb(prisma);
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
            it("should respond with status 200 and clear rider entry for userId and coasterId", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();

                await createRiders(1, createdUser.id, coasterObj.id);
    
                const response = await server.delete(`/riders/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

                const verifyEntry = await prisma.riders.count({
                    where: {
                        userId: createdUser.id,
                        coasterId: coasterObj.id,
                    }
                });
    
                expect(response.status).toBe(200);
                expect(verifyEntry).toBe(0);
            });
        });
    });
});
