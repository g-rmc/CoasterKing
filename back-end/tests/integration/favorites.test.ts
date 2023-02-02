import supertest from "supertest";
import { faker } from "@faker-js/faker";

import app from "../../src/app";
import { connectDb } from "../../src/config/database";
import { cleanDb } from "../helpers";
import { createUser, createCoaster, createFavorites } from "../factories";

const server = supertest(app);
const prisma = connectDb();

beforeEach(async () => {
    await cleanDb(prisma);
});

afterAll(async () => {
    await prisma?.$disconnect();
});

describe("GET /favorites/:coasterId", () => {
    it ("should respond with status 401 when no token is given", async () => {
        const response = await server.get("/favorites/1");

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when invalid token", async () => {
        const invalidToken = faker.random.alphaNumeric(5);

        const response = await server.get("/favorites/1").set("Authorization", invalidToken);

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when no user found", async () => {
        const accessToken = faker.random.alphaNumeric(30);

        const response = await server.get("/favorites/1").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(401);
    });

    describe("when token is valid", () => {
        it("should respond with status 400 when invalid CoasterId format", async () => {
            const createdUser = await createUser();
            const invalidParam = faker.random.alpha(3);

            const response = await server.get(`/favorites/${invalidParam}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(400);
        });

        it("should respond with status 404 when CoasterId not found", async () => {
            const createdUser = await createUser();
            const coasterObj = await createCoaster();

            const response = await server.get(`/favorites/${coasterObj.id+1}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(404);
        });

        describe("when coasterId is valid", () => {
            it("should respond with status 200 and favoriteStatus false if never rided", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();
    
                const response = await server.get(`/favorites/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);
    
                expect(response.status).toBe(200);
                expect(response.body).toEqual({ favoriteStatus: false });
            });

            it("should respond with status 200 and favoriteStatus true if already rided", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();

                await createFavorites(1, createdUser.id, coasterObj.id);
    
                const response = await server.get(`/favorites/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);
    
                expect(response.status).toBe(200);
                expect(response.body).toEqual({ favoriteStatus: true });
            });
        });
    });
});

describe("POST /favorites/:coasterId", () => {
    it ("should respond with status 401 when no token is given", async () => {
        const response = await server.post("/favorites/1");

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when invalid token", async () => {
        const invalidToken = faker.random.alphaNumeric(5);

        const response = await server.post("/favorites/1").set("Authorization", invalidToken);

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when no user found", async () => {
        const accessToken = faker.random.alphaNumeric(30);

        const response = await server.post("/favorites/1").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(401);
    });

    describe("when token is valid", () => {
        it("should respond with status 400 when invalid CoasterId format", async () => {
            const createdUser = await createUser();
            const invalidParam = faker.random.alpha(3);

            const response = await server.post(`/favorites/${invalidParam}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(400);
        });

        it("should respond with status 404 when CoasterId not found", async () => {
            const createdUser = await createUser();
            const coasterObj = await createCoaster();

            const response = await server.post(`/favorites/${coasterObj.id+1}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(404);
        });

        describe("when coasterId is valid", () => {
            it("should respond with status 400 if already has this entry in database", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();

                await createFavorites(1, createdUser.id, coasterObj.id);
    
                const response = await server.post(`/favorites/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

                const verifyEntry = await prisma.favorites.count({
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
    
                const response = await server.post(`/favorites/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

                const verifyEntry = await prisma.favorites.count({
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

describe("DELETE /favorites/:coasterId", () => {
    it ("should respond with status 401 when no token is given", async () => {
        const response = await server.delete("/favorites/1");

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when invalid token", async () => {
        const invalidToken = faker.random.alphaNumeric(5);

        const response = await server.delete("/favorites/1").set("Authorization", invalidToken);

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when no user found", async () => {
        const accessToken = faker.random.alphaNumeric(30);

        const response = await server.delete("/favorites/1").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(401);
    });

    describe("when token is valid", () => {
        it("should respond with status 400 when invalid CoasterId format", async () => {
            const createdUser = await createUser();
            const invalidParam = faker.random.alpha(3);

            const response = await server.delete(`/favorites/${invalidParam}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(400);
        });

        it("should respond with status 404 when CoasterId not found", async () => {
            const createdUser = await createUser();
            const coasterObj = await createCoaster();

            const response = await server.delete(`/favorites/${coasterObj.id+1}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(404);
        });

        it("should respond with status 404 when riders entry not found", async () => {
            const createdUser = await createUser();
            const coasterObj = await createCoaster();

            const response = await server.delete(`/favorites/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(404);
        });

        describe("when coasterId is valid", () => {
            it("should respond with status 200 and clear favorite entry for userId and coasterId", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();

                await createFavorites(1, createdUser.id, coasterObj.id);
    
                const response = await server.delete(`/favorites/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

                const verifyEntry = await prisma.favorites.count({
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
