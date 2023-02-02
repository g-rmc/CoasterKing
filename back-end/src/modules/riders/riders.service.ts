import { favoritesRepository, ratingsRepository, ridersRepository, usersRepository } from "../../repositories";
import { coastersService } from "../coasters/coasters.service";

async function verifyCoasterId(coasterId: number) {
    if (!await coastersService.verifyExistingCoasterId(coasterId)) throw new Error("coasterId not found");
}

async function getCoastersNumberByUser(userId: number) {
    const coastersCount = await ridersRepository.getCoastersCountByUserId(userId);
    return { userCoastersCount: coastersCount };
}

async function getRanking() {
    const ridersRanking = await ridersRepository.getRidersGoupByUserId();

    type Ranking = { userId: number, ranking: number, photoURL: string, displayName: string, credits: number }
    const usersRanking: Ranking[] = [];

    for (let i = 0; i < ridersRanking.length; i++) {
        const userData = await usersRepository.getUserPublicInfoById(ridersRanking[i].userId);
        usersRanking.push({
            userId: ridersRanking[i].userId,
            ranking: i+1,
            photoURL: userData.photoURL,
            displayName: userData.displayName.split(" ")[0],
            credits: ridersRanking[i]._count.coasterId
        });
    }

    return usersRanking;
}

async function getRidedOrNot(userId: number, coasterId: number) {
    await verifyCoasterId(coasterId);
    const riderEntry = await ridersRepository.getRiderEntryByUserAndCoasterId(userId, coasterId);
    if (riderEntry) return true;
    return false;
}

async function postRiderEntry(userId: number, coasterId: number) {
    await verifyCoasterId(coasterId);
    if (await ridersRepository.getRiderEntryByUserAndCoasterId(userId, coasterId)) throw new Error();
    await ridersRepository.createRiderEntryByUserAndCoasterId(userId, coasterId);
}

async function deleteRiderEntry(userId: number, coasterId: number) {
    await verifyCoasterId(coasterId);
    if (!await ridersRepository.getRiderEntryByUserAndCoasterId(userId, coasterId)) throw new Error("rider entry not found");
    await favoritesRepository.deleteFavoritesByCoasterAndUserId(userId, coasterId);
    await ratingsRepository.deleteRatingByCoasterAndUserId(coasterId, userId);
    await ridersRepository.deleteRiderEntryByUserAndCoasterId(userId, coasterId);
}

export const ridersService = {
    getCoastersNumberByUser,
    getRanking,
    getRidedOrNot,
    postRiderEntry,
    deleteRiderEntry
};
