import { coasters } from "@prisma/client";
import { coastersRepository, ratingsRepository } from "../../repositories";

async function getCoastersListWithAvgCountInfo() {
    const coastersList = await coastersRepository.getCoastersWithCount();

    const fullCoasterInfo: Partial<coasters & {_count: { riders: number, favorites: number }, _avg: { grade: number}}> [] = [];

    for (let i = 0; i < coastersList.length; i++) {
        const coasterRating = await ratingsRepository.getAvgGradeByCoasterId(coastersList[i].id);
        fullCoasterInfo.push({ ...coastersList[i], _avg: { grade: coasterRating._avg.grade } });
    }

    return fullCoasterInfo;
}

async function getCoastersListByUser(userId: number) {
    const coastersList = await coastersRepository.getCoastersByUserId(userId);

    const filteredCoastersList = coastersList.map(coaster => coaster.coasters);

    return filteredCoastersList;
}

async function verifyExistingCoasterId(coasterId: number) {
    const coasterObj = await coastersRepository.getCoasterById(coasterId);
    if (!coasterObj) return false;
    return true;
}

export const coastersService = {
    getCoastersListWithAvgCountInfo,
    getCoastersListByUser,
    verifyExistingCoasterId
};
