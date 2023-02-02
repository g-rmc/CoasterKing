import supertest from "supertest";
import { faker } from "@faker-js/faker";

import app from "../../src/app";
import { connectDb } from "../../src/config/database";
import { cleanDb } from "../helpers";
import { user, createUser } from "../factories";

const server = supertest(app);
const prisma = connectDb();

beforeEach(async () => {
    await cleanDb(prisma);
});

afterAll(async () => {
    await prisma?.$disconnect();
});

describe("GET /users", () => {
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
        it ("should respond with status 200 and userObj when user is found", async () => {
            const createdUser = await createUser();
            const response = await server.get("/users").set("Authorization", `Bearer ${createdUser.accessToken}`);
    
            expect(response.status).toBe(200);
            expect(response.body).toEqual(createdUser);
        });
    });
});

describe("POST /users", () => {
    it ("should respond with status 400 when no body is given", async () => {
        const response = await server.post("/users");

        expect(response.status).toBe(400);
    });

    it ("should respond with status 400 when body is not valid", async () => {
        const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
        const response = await server.post("/users").send(invalidBody);
        
        expect(response.status).toBe(400);
    });

    describe("when body is valid", () => {
        it("should respond with status 200 and id when create new user", async () => {
            const response = await server.post("/users").send(user);
        
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({ userId: expect.any(Number) }));
        });

        it("should respond with status 200 and id when update existing user", async () => {
            const createdUser = await createUser();
            const { id, ...updatedUser } = createdUser;
            updatedUser.accessToken = faker.lorem.word();
            updatedUser.uid = faker.lorem.word();

            const response = await server.post("/users").send(updatedUser);
        
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ userId: id });
        });
    });
});
