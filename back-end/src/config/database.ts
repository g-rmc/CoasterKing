/* eslint-disable boundaries/no-private */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function connectDb() {
    return prisma;
}
