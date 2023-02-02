import supertest from "supertest";
import { faker } from "@faker-js/faker";

import app from "../../src/app";
import { connectDb } from "../../src/config/database";
import { cleanDb } from "../helpers";
import { createUser, createCoaster, createOneRatingWithGrade } from "../factories";

const server = supertest(app);
const prisma = connectDb();

beforeEach(async () => {
    await cleanDb(prisma);
});

afterAll(async () => {
    await prisma?.$disconnect();
});

describe("GET /ratings/:coasterId", () => {
    it ("should respond with status 401 when no token is given", async () => {
        const response = await server.get("/ratings/1");

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when invalid token", async () => {
        const invalidToken = faker.random.alphaNumeric(5);

        const response = await server.get("/ratings/1").set("Authorization", invalidToken);

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when no user found", async () => {
        const accessToken = faker.random.alphaNumeric(30);

        const response = await server.get("/ratings/1").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(401);
    });

    describe("when token is valid", () => {
        it("should respond with status 400 when invalid CoasterId format", async () => {
            const createdUser = await createUser();
            const invalidParam = faker.random.alpha(3);

            const response = await server.get(`/ratings/${invalidParam}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(400);
        });

        it("should respond with status 404 when CoasterId not found", async () => {
            const createdUser = await createUser();
            const coasterObj = await createCoaster();

            const response = await server.get(`/ratings/${coasterObj.id+1}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(404);
        });

        describe("when coasterId is valid", () => {
            it("should respond with status 200 and grade null when there is no rating", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();
    
                const response = await server.get(`/ratings/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);
    
                expect(response.status).toBe(200);
                expect(response.body).toEqual({ grade: null });
            });

            it("should respond with status 200 and grade when there is rating", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();
                const grade = faker.datatype.number({
                    "min": 0,
                    "max": 5
                });

                await createOneRatingWithGrade(grade*10, createdUser.id, coasterObj.id);
    
                const response = await server.get(`/ratings/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);
    
                expect(response.status).toBe(200);
                expect(response.body).toEqual({ grade });
            });
        });
    });
});

describe("POST /ratings/:coasterId", () => {
    it ("should respond with status 401 when no token is given", async () => {
        const response = await server.post("/ratings/1");

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when invalid token", async () => {
        const invalidToken = faker.random.alphaNumeric(5);

        const response = await server.post("/ratings/1").set("Authorization", invalidToken);

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when no user found", async () => {
        const accessToken = faker.random.alphaNumeric(30);

        const response = await server.post("/ratings/1").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(401);
    });

    describe("when token is valid", () => {
        it("should respond with status 400 when invalid CoasterId format", async () => {
            const createdUser = await createUser();
            const invalidParam = faker.random.alpha(3);

            const response = await server.post(`/ratings/${invalidParam}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(400);
        });

        it("should respond with status 404 when CoasterId not found", async () => {
            const createdUser = await createUser();
            const coasterObj = await createCoaster();

            const response = await server.post(`/ratings/${coasterObj.id+1}`).set("Authorization", `Bearer ${createdUser.accessToken}`).send({ grade: 3 });

            expect(response.status).toBe(404);
        });

        describe("when coasterId is valid", () => {
            it("should respond with status 400 when invalid body format", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();
                const invalidBody = faker.random.alpha(2);
    
                const response = await server.post(`/ratings/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`).send(invalidBody);
    
                expect(response.status).toBe(400);
            });
    
            it("should respond with status 400 when grade is not a number", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();
                const invalidBody = faker.random.alpha(2);
    
                const response = await server.post(`/ratings/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`).send({ grade: invalidBody });
    
                expect(response.status).toBe(400);
            });

            it("should respond with status 400 when grade is not an integer between 0 and 5", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();
    
                const responseLess = await server.post(`/ratings/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`).send({ grade: -0.1 });
                const responseMore = await server.post(`/ratings/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`).send({ grade: 5.1 });
    
                expect(responseLess.status).toBe(400);
                expect(responseMore.status).toBe(400);
            });

            describe("when grade is valid", () => {
                it("should respond with status 200 and register one entry when first register", async () => {
                    const createdUser = await createUser();
                    const coasterObj = await createCoaster();
                    const grade = faker.datatype.number({
                        "min": 0,
                        "max": 5,
                    });
        
                    const response = await server.post(`/ratings/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`).send({ grade });
    
                    const rawEntry = await prisma.ratings.findFirst({
                        where: {
                            userId: createdUser.id,
                            coasterId: coasterObj.id,
                        }
                    });
                    const verifyEntry = { ...rawEntry, grade: rawEntry.grade/10 };
        
                    expect(response.status).toBe(200);
                    expect(verifyEntry).toMatchObject({ userId: createdUser.id, coasterId: coasterObj.id, grade });
                });
    
                it("should respond with status 200 and update one entry when already rated", async () => {
                    const createdUser = await createUser();
                    const coasterObj = await createCoaster();
                    const grade = faker.datatype.number({
                        "min": 0,
                        "max": 5,
                    });

                    await createOneRatingWithGrade(grade*10, createdUser.id, coasterObj.id);
        
                    const response = await server.post(`/ratings/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`).send({ grade });
    
                    const rawEntry = await prisma.ratings.findFirst({
                        where: {
                            userId: createdUser.id,
                            coasterId: coasterObj.id,
                        }
                    });

                    const verifyEntry = { ...rawEntry, grade: rawEntry.grade/10 };
        
                    expect(response.status).toBe(200);
                    expect(verifyEntry).toMatchObject({ userId: createdUser.id, coasterId: coasterObj.id, grade: grade });
                });
            });
        });
    });
});

describe("DELETE /ratings/:coasterId", () => {
    it ("should respond with status 401 when no token is given", async () => {
        const response = await server.delete("/ratings/1");

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when invalid token", async () => {
        const invalidToken = faker.random.alphaNumeric(5);

        const response = await server.delete("/ratings/1").set("Authorization", invalidToken);

        expect(response.status).toBe(401);
    });

    it ("should respond with status 401 when no user found", async () => {
        const accessToken = faker.random.alphaNumeric(30);

        const response = await server.delete("/ratings/1").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(401);
    });

    describe("when token is valid", () => {
        it("should respond with status 400 when invalid CoasterId format", async () => {
            const createdUser = await createUser();
            const invalidParam = faker.random.alpha(3);

            const response = await server.delete(`/ratings/${invalidParam}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(400);
        });

        it("should respond with status 404 when CoasterId not found", async () => {
            const createdUser = await createUser();
            const coasterObj = await createCoaster();

            const response = await server.delete(`/ratings/${coasterObj.id+1}`).set("Authorization", `Bearer ${createdUser.accessToken}`);

            expect(response.status).toBe(404);
        });

        describe("when coasterId is valid", () => {    
            it("should respond with status 200 and remove rating from db", async () => {
                const createdUser = await createUser();
                const coasterObj = await createCoaster();

                await createOneRatingWithGrade(30, createdUser.id, coasterObj.id);
    
                const response = await server.delete(`/ratings/${coasterObj.id}`).set("Authorization", `Bearer ${createdUser.accessToken}`);
    
                const verifyEntry = await prisma.ratings.count({
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
