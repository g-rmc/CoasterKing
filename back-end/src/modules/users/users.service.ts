import { NewUserParams, usersRepository } from "../../repositories";

async function getUserByAccessToken(accessToken: string) {
    return await usersRepository.getUserByToken(accessToken);
}

async function createUpdateUser(userObj: NewUserParams) {
    return await usersRepository.upsertUser(userObj);
}

export const usersService = {
    getUserByAccessToken,
    createUpdateUser
};
