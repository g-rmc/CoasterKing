import { faker } from "@faker-js/faker";
import { coasters } from "@prisma/client";
import { prisma } from "../../src/config/database";

const coaster: Omit<coasters, "id"> = {
    name: faker.random.words(3),
    parkName: faker.company.name(),
    image: faker.image.imageUrl(),
    rcdbId: faker.random.numeric(4),
};

export function createCoaster() {
    return prisma.coasters.create({
        data: coaster
    });
}

