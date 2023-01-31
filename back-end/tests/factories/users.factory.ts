import { faker } from "@faker-js/faker";
import { users } from "@prisma/client";
import { prisma } from "../../src/config/database";

export const user: Omit<users, "id"> = {
    email: faker.internet.email(),
    displayName: faker.name.fullName(),
    photoURL: faker.image.imageUrl(),
    accessToken: faker.random.alphaNumeric(30),
    uid: faker.random.numeric(10),
};

export async function createUser() {
    return await prisma.users.create({
        data: user
    });
}
